import { Roles } from './../../roles/entities/role.entity';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    // @IsOptional()
    // @IsNumber()
    // id: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: "This is not a name"})
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: "It's not a mobile number" })
    // @Length(11, 15) // Eta jodi 11 to 15 characters moddhe na hoy tahole database theke error message handle hobe
    @Length(11, 15,{message: "Mobile number must be between 11 to 13 characters"})
    // Eta jodi 11 to 15 characters moddhe na hoy tahole | {message: "Mobile ..."} eta throw hobe
    mobile: string;
    
    @ApiPropertyOptional()
    // @IsOptional()
    @IsEmail({},{message: "This email is not a valid email"})
    email: string;
    
    @ApiPropertyOptional()
    // @IsOptional()
    @IsString()
    // @Length( 5, 20 )
    password: string;

    @ApiPropertyOptional()
    @ApiProperty({ type: Array })
    @IsArray({ message: "Id request is not valid"})
    roles: Roles[];
}
