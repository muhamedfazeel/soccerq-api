import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/models/roles.enum';

export const roles = (...userRoles: Roles[]) => SetMetadata('roles', userRoles);
