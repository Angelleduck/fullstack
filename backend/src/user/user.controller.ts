import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get('/')
  async getUser(@Req() req: Request) {
    const user = await this.userService.getUser(req);
    return user;
  }
}
