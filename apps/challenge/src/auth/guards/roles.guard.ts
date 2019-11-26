import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUserDocument } from '../schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  /**
   * Validates if the authenticated user contains at least one role of the "roles" variable
   * also if "roles" don't exist continue with the next handler or Guard
   *
   * if the user don't has one valid role return a Forbidden exception (HTTP Status code 403)
   *
   * @param context
   */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user: IUserDocument = req.user;

    return user && this.hasRole(user, roles);
  }

  /**
   * Iterator over the authenticated user roles to check if one of them appears into
   * the valid roles
   *
   * @param user
   * @param validRoles
   */
  private hasRole(user: IUserDocument, validRoles: string[]) {
    const { roles } = user;
    const userHasRole = () => roles.some(role => validRoles.includes(role));

    return roles && userHasRole();
  }
}
