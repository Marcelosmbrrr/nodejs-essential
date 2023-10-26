import {
    Controller,
    Get,
    Res,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards
} from '@nestjs/common';
import { Response } from 'express';
// Custom
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(AuthGuard) // Protect all routes in this controller
export class UsersController {

    // Dependency Injection
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@Res() response: Response) {
        const users = await this.usersService.getUsers();

        response.status(200).send({
            users: users,
        });
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
        await this.usersService.createUser(createUserDto);

        return response.status(201).send({
            message: 'User successful created!',
        });
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() response: Response) {
        await this.usersService.updateUser(+id, updateUserDto);

        response.status(200).send({
            message: 'User has been updated!',
        });
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response: Response) {
        await this.usersService.deleteUser(+id);

        response.status(200).send({
            message: 'User has been deleted!',
        });
    }

}