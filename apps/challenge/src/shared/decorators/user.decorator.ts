import { createParamDecorator } from '@nestjs/common';
import { IUserDocument } from '../../auth/schemas/user.schema';

/**
 * Provides and user object into the request (This user is the authenticated user thar makes the request)
 */
export const User = createParamDecorator((data, req): IUserDocument => req.user);
