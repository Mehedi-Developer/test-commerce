import { IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsNumber()
    id: number;
    
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString({ message: "It's not a mobile number" })
    @Length(2, 14)
    mobile: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @Length( 5, 20 )
    password: string;

}
