import { PostDto } from '@app/entity/post.entity';
import { BadRequestException } from '@nestjs/common';

export type PostUpdateResponse = PostDto | BadRequestException;
