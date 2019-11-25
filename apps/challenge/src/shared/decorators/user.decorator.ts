import { createParamDecorator } from '@nestjs/common';
import { IUserDocument } from '../../auth/schemas/user.schema';

export const User = createParamDecorator((data, req): IUserDocument => req.user);
