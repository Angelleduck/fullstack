import { HttpException, HttpStatus } from '@nestjs/common';

export class VeryBadRequestException extends HttpException {
  constructor() {
    // super( 'Very bad' , HttpStatus.BAD_REQUEST);
    super({ error: 'Very bad' }, HttpStatus.BAD_REQUEST);
  }
}
