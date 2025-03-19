import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { createPostDto } from 'src/dtos/post.dto';
import { PostService } from './post.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts')
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post('/createPost')
  createPost(@Body() body: createPostDto) {
    return this.postService.createPost(body);
  }

  @Delete('/deleteAllPosts')
  async deleteAllPosts() {
    await this.postService.deleteAllPosts();
    return { message: 'All posts have been deleted' };
  }

  @Delete('/deletePost/:id')
  async deletePost(@Param('id') id: string) {
    const { title } = await this.postService.deletepost(id);

    return { message: `${title} has been deleted` };
  }
}
