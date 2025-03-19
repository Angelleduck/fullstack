import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { jwtTokenType, refreshToken } from 'types/cookie';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async validateRegistering(body: RegisterDto) {
    const { password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }

    const isEmailExist = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (isEmailExist) {
      throw new HttpException('Email already Exist', HttpStatus.BAD_REQUEST);
    }

    // hash user password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    await this.prismaService.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
  }

  async validateLogin({ email, password }: LoginDto, response: Response) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    // set Cookie
    const accessToken = jwt.sign({ id: user.id }, process.env.accessTokenKey, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.refreshTokenKey,
      {
        expiresIn: '30d',
      },
    );

    response
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 15,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/auth/refreshToken',
      });

    delete user.password;

    return user;
  }

  async refreshToken(refreshToken: refreshToken, res: Response) {
    try {
      //verify token is still valid

      const token = <jwtTokenType>(
        jwt.verify(refreshToken, process.env.refreshTokenKey)
      );

      const user = await this.prismaService.user.findUnique({
        where: {
          id: token.id,
        },
      });

      if (!user) {
        throw new HttpException(
          'invalid refresh token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const accessToken = jwt.sign(
        { id: user.id },
        process.env.accessTokenKey,
        { expiresIn: '15m' },
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 15,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }
}
