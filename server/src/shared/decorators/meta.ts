import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const isPublic = Symbol('is-public');

export function Public(): CustomDecorator<any> {
  return SetMetadata(isPublic, true);
}
