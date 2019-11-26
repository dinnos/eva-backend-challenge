import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IUserDocument } from '../schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user: IUserDocument = req.user;

    return user && this.hasRole(user, roles);
  }

  private hasRole(user: IUserDocument, validRoles: string[]) {
    const { roles } = user;
    const userHasRole = () => roles.some(role => validRoles.includes(role));

    return roles && userHasRole();
  }
}
