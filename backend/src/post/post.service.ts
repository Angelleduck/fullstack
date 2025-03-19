import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createPostDto } from 'src/dtos/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async createPost({ title, content }: createPostDto) {
    return await this.prismaService.post.create({
      data: {
        title,
        content,
      },
    });
  }

  async getAllPosts() {
    return await this.prismaService.post.findMany();
  }

  async deleteAllPosts() {
    await this.prismaService.post.deleteMany();
  }

  async deletepost(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
    }

    await this.prismaService.post.delete({
      where: {
        id,
      },
    });

    return post;
  }
}
