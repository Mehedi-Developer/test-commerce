import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class AuthLoginDto extends OmitType(CreateUserDto, ['email', "mobile","roles"] as const){

}