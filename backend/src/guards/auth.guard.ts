import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import * as jwt from 'jsonwebtoken';
import { jwtTokenType } from 'types/cookie';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      //get the request
      const request: Request = context.switchToHttp().getRequest();

      const accessToken = request.cookies.accessToken;

      if (!accessToken) {
        throw new HttpException(
          'Invalid access token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      //check if token is valid
      const token = <jwtTokenType>(
        jwt.verify(accessToken, process.env.accessTokenKey)
      );

      //put id into request to use it in handlers
      request['id'] = token.id;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Invalid access token', HttpStatus.UNAUTHORIZED);
    }
  }
}
