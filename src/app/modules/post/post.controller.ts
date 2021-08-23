import { Post } from '@app/entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post as PostMethod,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { PostCreateReq } from './dto/post.create.dto';
import { Role } from '@app/interfaces/role.interface';
import { RoleRequire } from '@app/decorators/role.decorator';
import { RoleGuard } from '@app/guards/role.guard';
import { CurrentUser } from '@app/decorators/current-user.decorator';
import { IUser } from '@app/interfaces/user.interface';
import { PostUpdateReq } from './dto/post.update.dto';
import { PostPagingReq } from './dto/post.paging.dto';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @UseGuards(RoleGuard)
  @RoleRequire(Role.ADMIN)
  @ApiBearerAuth()
  @PostMethod('')
  async createPost(@CurrentUser() user: IUser, @Body() args: PostCreateReq) {
    return this.postService.create(user, args);
  }

  @UseGuards(RoleGuard)
  @RoleRequire(Role.ADMIN)
  @ApiBearerAuth()
  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() args: PostUpdateReq) {
    return this.postService.update(id, args);
  }

  @UseGuards(RoleGuard)
  @RoleRequire(Role.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }

  @Get(':slug')
  async getPost(@Param('slug') slug: string) {
    return this.postService.getPostbySlug(slug);
  }

  @Get()
  async getPosts(@Query() args: PostPagingReq) {
    return this.postService.getPostMany(args);
  }
}
