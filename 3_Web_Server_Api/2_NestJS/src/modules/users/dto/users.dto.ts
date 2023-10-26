import { IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(3, 255)
    username: string;

    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    @Length(3, 255)
    username: string;

    @IsString()
    password: string;
}