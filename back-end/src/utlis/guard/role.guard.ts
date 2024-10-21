import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entities';
import { RoleType } from '../type';
import { ROLES_KEY } from '../decorate/role.decoator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    console.log(user);

    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
