import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AppContextService } from '@src/app-context/app.context.service';
import { AppContext } from '@src/app-context/app.context.dto';
import { XHeader } from '@src/app-context/types';
import { IncomingMessage } from 'http';
@Injectable()
export class AppInterceptor implements NestInterceptor {
  constructor(private readonly contextService: AppContextService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    if (context.getType<GqlContextType>() === 'graphql')
      await this.interceptGql(context);

    return next.handle();
  }

  private async interceptGql(context: ExecutionContext): Promise<void> {
    const msg = GqlExecutionContext.create(context).getContext<{
      req: IncomingMessage;
    }>().req;
    this.setContext(fetchHeaders(msg));
  }

  private setContext(headers: Record<XHeader, string>): AppContext {
    return this.contextService.setContextFromHeaders(headers);
  }
}

function fetchHeaders(msg: IncomingMessage): Record<string, string> {
  const headers = {};
  msg.rawHeaders.forEach((val, index) => {
    if (index % 2) return;
    headers[val?.toLowerCase()] = msg.rawHeaders[index + 1];
  });
  return headers;
}
