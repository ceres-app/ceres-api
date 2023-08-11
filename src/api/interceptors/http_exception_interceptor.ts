import { HttpError } from '@/domain/exceptions/http_error';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpError)
          return throwError(
            () => new HttpException(error.message, error.status),
          );
        return throwError(() => error);
      }),
    );
  }
}
