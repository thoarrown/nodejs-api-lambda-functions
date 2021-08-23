import { Post } from '@app/entity';
import {
  BadGatewayException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PostCreateReq } from './dto/post.create.dto';
import { IUser } from '@app/interfaces/user.interface';
import { PostUpdateReq } from './dto/post.update.dto';
import { PostUpdateResponse } from './response/post.response';
import { FirebaseFireStoreService } from '../firebase/firebase-firestore.service';
import { CollectionFirestore } from '../firebase/collection-firestore';
import { converSlug } from '@app/utils/slug.util';
import { PostCreateResponse } from './response/post.create.response';
import { PostDto } from '@app/entity/post.entity';
import { PostPagingReq } from './dto/post.paging.dto';

export class PostService {
  private firestore = FirebaseFireStoreService.firestore();
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) { }

  async update(
    postId: string,
    args: PostUpdateReq,
  ): Promise<PostUpdateResponse> {
    const nextDto = args;

    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new BadRequestException('Not Found Post');

    nextDto.slug = await this.genSlug({
      title: nextDto.title,
      slug: nextDto.slug,
    });

    const firebasePost = await this.firestore.update(
      CollectionFirestore.POST,
      {
        title: nextDto.title,
        content: nextDto.content,
        slug: nextDto.slug,
      },
      post.docId,
    );

    const updatePost: Post = await this.postRepo
      .update(postId, {
        title: nextDto.title,
        content: nextDto.content,
        slug: nextDto.slug,
      })
      .then((data) => {
        return data.raw;
      })
      .catch(() => {
        throw new NotFoundException();
      });

    return {
      id: postId,
      title: updatePost.title,
      content: updatePost.content,
    };
  }

  async create(
    currentUser: IUser,
    dto: PostCreateReq,
  ): Promise<PostCreateResponse> {
    try {
      const nextDto = dto;
      nextDto.slug = await this.genSlug({
        title: nextDto.title,
        slug: nextDto.slug,
      });
      const newPost: Post = Post.create({
        title: nextDto.title,
        content: nextDto.content,
        slug: nextDto.slug,
        user_id: currentUser.id,
      });

      const createPostDoc = await this.firestore.create<Post>(
        CollectionFirestore.POST,
        newPost.toDto() as any,
      );
      const nextPost = await this.postRepo.create(
        Post.create({ ...newPost.toDto(), docId: createPostDoc.id }).toDto(),
      );

      await this.postRepo.save(nextPost);
      return newPost.toDto();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getPostbySlug(slug: string): Promise<PostDto | null> {
    const post = await this.postRepo.findOne({ where: { slug } });
    if (!post) return null;
    return Post.create(post).toDto();
  }

  async delete(id: string): Promise<string | null> {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) return null;
    await this.firestore.delete(CollectionFirestore.POST, post.docId);
    await this.postRepo.delete(id);
    return id;
  }

  async getPostMany({ skip, take }: PostPagingReq): Promise<PostDto[]> {
    const posts = await this.postRepo.find(
      { take, skip }
    );
    return posts.map(item => Post.create(item).toDto());
  }

  async genSlug({
    title,
    slug,
    id,
  }: {
    title: string;
    slug?: string | null;
    id?: number;
  }): Promise<string> {
    const prevSlug = converSlug(slug || title);
    const hasSlug = await this.postRepo.findOne({
      where: {
        slug: prevSlug,
        ...(id && { id: Not(id) }),
      },
    });

    return hasSlug ? `${prevSlug}-${new Date().getTime()}` : prevSlug;
  }
}
