// import { PartialType } from '@nestjs/mapped-types';
import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto){ // CreateUserDto er sob property access korbe
    // Requirements onujayi update korar jonno ei dto file ta dorkar...
// export class UpdateUserDto extends OmitType(CreateUserDto, ['email'] as const) {
    // email property sara CreateUserDto er sob property access korbe
}
