import { BadRequestException, HttpStatus } from '@nestjs/common';

export class UserExistException extends BadRequestException {
  /**
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(
    objectOrError?: string | Record<string, unknown> | any,
    description = 'Email is exist',
  ) {
    super(
      BadRequestException.createBody(
        objectOrError,
        description,
        HttpStatus.BAD_REQUEST,
      ),
    );
  }
}
