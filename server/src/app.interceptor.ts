import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AppContextService } from '@src/shared/app-context/app.context.service';
import { IncomingMessage } from 'http';
import { Reflector } from '@nestjs/core';
import { isPublic } from '@src/shared/decorators';
import { AuthTokenService } from '@src/auth/auth-token/services/token.service';

interface IMetadata {
  readonly isPublic: boolean;
}

@Injectable()
export class AppInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly contextService: AppContextService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    if (context.getType<GqlContextType>() === 'graphql')
      await this.interceptGql(context);

    return next.handle();
  }

  private async interceptGql(context: ExecutionContext): Promise<void> {
    const ctx = GqlExecutionContext.create(context).getContext()?.req || {};
    this.contextService.setContextFromHeaders(this.fetchHeaders(ctx));

    const appCtx = this.contextService.getContext();

    const userData = this.authTokenService.getTokenPayload(
      appCtx.authorization,
    );

    const metadata = this.getMetadata(context);

    if (
      !metadata.isPublic &&
      !this.authTokenService.isValidAccessToken(appCtx.authorization)
    ) {
      throw new UnauthorizedException();
    }

    this.contextService.setContext({ user: userData });
  }

  private getMetadata(context: ExecutionContext): IMetadata {
    const guardedClass = context.getClass();
    const guardedHandler = context.getHandler();

    return {
      isPublic: this.reflector.getAllAndOverride(isPublic, [
        guardedHandler,
        guardedClass,
      ]),
    };
  }

  private fetchHeaders(msg: IncomingMessage): Record<string, string> {
    const headers = {};
    msg.rawHeaders.forEach((val, index) => {
      if (index % 2) return;
      headers[val?.toLowerCase()] = msg.rawHeaders[index + 1];
    });
    return headers;
  }
}
