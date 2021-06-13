import { ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

// export class LoginDto extends PartialType( OmitType(CreateUserDto, ['name', "mobile"] as const)){} 
export class LoginDto extends  OmitType(CreateUserDto, ['name', "mobile"] as const){
    // @ApiPropertyOptional()
    // // @IsOptional()
    // @IsEmail({},{message: "This email is not a valid email"})
    // email: string;
    
    // @ApiPropertyOptional()
    // // @IsOptional()
    // @IsString()
    // // @Length( 5, 20 )
    // password: string;
} 