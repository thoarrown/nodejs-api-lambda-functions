import { Role } from '@app/interfaces/role.interface';
import { SetMetadata } from '@nestjs/common';

export const RoleMetadataKey = 'role';

export const RoleRequire = (role: Role) => {
  return SetMetadata(RoleMetadataKey, role);
};
