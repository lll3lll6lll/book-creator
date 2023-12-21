import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { AppContext } from './app.context.dto';
import { plainToInstance } from 'class-transformer';
import { XHeader } from './types';
import { CookieDto } from '@src/shared/app-context/cookie.dto';

interface StorageType {
  appContext: AppContext;
  //     flags?: IRequestFlags;
}

const headerMap: { [K in XHeader]: keyof AppContext } = {
  'user-agent': 'userAgent',
  authorization: 'authorization',
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

      if (key === 'cookie') {
        context.cookie = this.parseCookies(value);
        continue;
      }
      context[headerMap[key]] = value;
    }

    return this.setContext(context);
  }

  getContext(): AppContext {
    return this.storage.getStore()?.appContext || new AppContext();
  }

  private parseCookies(cookie: string): CookieDto {
    return cookie
      .split(';')
      .map((i) => i.split('='))
      .reduce((acc, entry) => {
        acc[entry[0]] = entry[1];
        return acc;
      }, {});
  }
}

export const appContextService = new AppContextService();
