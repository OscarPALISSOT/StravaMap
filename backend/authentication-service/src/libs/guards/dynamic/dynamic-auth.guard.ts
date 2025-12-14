import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context
      .switchToHttp()
      .getRequest<Request & { authOptions?: unknown }>();
    const provider = req.params.provider;

    const guard = new (AuthGuard(provider))();

    req.authOptions = {
      session: false,
      scope: req.query.scope,
    }

    return guard.canActivate(context);
  }
}
