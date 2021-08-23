import { HttpException, HttpStatus } from '@nestjs/common';

export class NotHaveRoleException extends HttpException {
  /**
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(
    objectOrError?: string | Record<string, unknown> | any,
    description = 'Not have role to perform action',
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.BAD_REQUEST,
      ),
      HttpStatus.BAD_REQUEST,
    );
  }
}
