import { Global, Module } from '@nestjs/common';
import { appContextService, AppContextService } from './app.context.service';

@Global()
@Module({
  providers: [{ provide: AppContextService, useValue: appContextService }],
  exports: [{ provide: AppContextService, useValue: appContextService }],
})
export class AppContextModule {}
