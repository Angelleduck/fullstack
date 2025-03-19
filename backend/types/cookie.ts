import * as jwt from 'jsonwebtoken';

export type refreshToken = string | undefined;

export interface jwtTokenType extends jwt.JwtPayload {
  id: string;
}
