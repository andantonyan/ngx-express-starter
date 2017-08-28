import { Pipe, PipeTransform } from '@angular/core';
import { CustomError } from '../../services';

@Pipe({ name: 'appErrorMessages' })
export class ErrorMessagesPipe implements PipeTransform {
  transform(error: string): string {
    return CustomError.errorMessagesMap[error] || error;
  }
}
