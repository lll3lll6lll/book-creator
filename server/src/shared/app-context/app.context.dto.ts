import { TokenPayloadDto } from '@src/auth/auth-token/dto/payload.dto';
import { CookieDto } from '@src/shared/app-context/cookie.dto';

export class AppContext {
  cookie?: CookieDto;
  userAgent?: string;
  authorization?: string;
  user?: TokenPayloadDto;
}
