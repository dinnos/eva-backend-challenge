import { SetMetadata } from '@nestjs/common';

/**
 * Construct and array of roles into a variable "roles" with the arguments provide
 *
 * @param roles
 * @constructor
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
