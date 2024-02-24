import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class GetInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(map((data) => data));
  }
}

type createType = {
  result: string;
  created_id: string;
};

export class CreateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<createType> {
    return handler
      .handle()
      .pipe(map((data) => ({ result: 'ok', created_id: data })));
  }
}

type updateType = {
  result: string;
  updated_entity: string;
  updated_id: string;
};
export class UpdateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<updateType> {
    return handler.handle().pipe(
      map((data) => ({
        result: 'ok',
        updated_entity: data.entity,
        updated_id: data.id,
      })),
    );
  }
}

type deleteType = {
  result: string;
  deleted_entity: string;
  deleted_id: string;
};

export class DeleteInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<deleteType> {
    return handler.handle().pipe(
      map((data) => ({
        result: 'ok',
        deleted_entity: data.entity,
        deleted_id: data.id,
      })),
    );
  }
}
