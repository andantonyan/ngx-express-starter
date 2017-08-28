import { Injectable } from '@angular/core';

export interface ICustomErrorAdditionalData {
}

export interface ICustomError {}

@Injectable()
export class CustomError extends Error implements ICustomError {
  static errorMessagesMap = {
    INTERNAL_ERROR: 'Unexpected error occurred'
  };
  constructor(message: string, public data?: ICustomErrorAdditionalData) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export type Errors = CustomError;
