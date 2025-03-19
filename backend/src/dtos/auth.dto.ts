import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(18)
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'password too weak' })
  password: string;

  @IsString()
  confirmPassword: string;
}
