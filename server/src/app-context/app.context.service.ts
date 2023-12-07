import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { AppContext } from './app.context.dto';
import { plainToInstance } from 'class-transformer';
import { XHeader } from './types';

interface StorageType {
  appContext: AppContext;
  //     flags?: IRequestFlags;
}

const headerMap: { [K in XHeader]: keyof AppContext } = {
  'x-user-id': 'userId',
  'x-session-id': 'sessionId',
  'x-request-id': 'requestId',
  cookie: 'cookie',
};
@Injectable()
export class AppContextService {
  private readonly storage: AsyncLocalStorage<StorageType>;

  constructor() {
    this.storage = new AsyncLocalStorage<StorageType>();
  }
  setContext(ctx: AppContext): AppContext {
    const store = this.storage.getStore() || {};
    const appContext = plainToInstance(AppContext, { ...ctx });
    this.storage.enterWith({ ...store, appContext });
    return appContext;
  }

  setContextFromHeaders(
    headers: Record<XHeader | string, string | undefined>,
  ): AppContext {
    const context: AppContext = new AppContext();

    for (let key in headers) {
      const value = headers[key];
      key = key.toLowerCase();
      if (!headerMap[key] || !value) continue;
      context[headerMap[key]] = value;
    }

    return this.setContext(context);
  }
  getContext(): AppContext {
    return this.storage.getStore()?.appContext || new AppContext();
  }
}

export const appContextService = new AppContextService();
