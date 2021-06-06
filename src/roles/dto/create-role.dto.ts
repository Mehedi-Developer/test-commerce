import { IsNumber, IsOptional, IsString, Length} from "class-validator";

export class CreateRoleDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional() // Eta ashbe ki ashbe na ei bishoy ta handle kore...
    @IsString({message : "Is not string"}) // Datatype valid kina ei bishoy ta handle kore... 
    // Er jonno main.ts er moddhe app.useGlobalPipes( new ValidationPipe() ); use korte hobe
    // Jeta @nest/common package theke ashbe
    type: string;
    
    @IsOptional()
    @IsString()
    @Length(2, 50) //
    position: string;
    
    @IsOptional()
    @IsString()
    company: string;
}
