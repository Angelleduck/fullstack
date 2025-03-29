import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { refreshToken } from 'types/cookie';

@Controller('auth')
export class AuthController {
  prismaService: PrismaService;
  authService: AuthService;
  constructor(prismaService: PrismaService, authService: AuthService) {
    this.authService = authService;
    this.prismaService = prismaService;
  }
  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() body: LoginDto,
  ) {
    const user = await this.authService.validateLogin(body, response);

    return { user };
  }

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    await this.authService.validateRegistering(body);

    return { message: 'You have been registered' };
  }

  @Get('refreshToken')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    //check if request token exist
    const refreshToken: refreshToken = req.cookies.refreshToken;
    const accessToken: refreshToken = req.cookies.accessToken;
    console.log(refreshToken);
    console.log(accessToken);

    if (!refreshToken) {
      throw new HttpException('refresh token missing', HttpStatus.UNAUTHORIZED);
    }

    await this.authService.refreshToken(refreshToken, res);
    return { message: 'access Token refreshed' };
  }
}
