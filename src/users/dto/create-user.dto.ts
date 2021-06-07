import { IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    // @IsOptional()
    // @IsNumber()
    // id: number;
    
    @IsOptional()
    @IsString({ message: "This is not a name"})
    name: string;

    @IsOptional()
    @IsString({ message: "It's not a mobile number" })
    // @Length(11, 15) // Eta jodi 11 to 15 characters moddhe na hoy tahole database theke error message handle hobe
    @Length(11, 15,{message: "Mobile number must be between 11 to 13 characters"})
    // Eta jodi 11 to 15 characters moddhe na hoy tahole | {message: "Mobile ..."} eta throw hobe
    mobile: string;

    // @IsOptional()
    @IsEmail({},{message: "This email is not a valid email"})
    email: string;

    // @IsOptional()
    @IsString()
    // @Length( 5, 20 )
    password: string;

}
