import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getUser(req: Request) {
    const id = req['id'];
    return await this.prismaService.user.findUnique({
      omit: { password: true },
      where: {
        id,
      },
    });
  }
}
