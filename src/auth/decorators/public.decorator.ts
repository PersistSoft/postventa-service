import { SetMetadata } from '@nestjs/common';

/**
 * Key used on @public() decorator
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator used to mark the endpoints which not is necessary used access tokens.
 * @version 1.0
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
