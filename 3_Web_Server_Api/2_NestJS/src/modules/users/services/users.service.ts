import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// Custom
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { PrismaService } from 'src/modules/global/prisma/prisma.service';

@Injectable()
export class UsersService {

    // Dependency Injection
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getUsers() {
        const users = await this.prisma.user.findMany()
        return users;
    }

    async createUser({ username, password }: CreateUserDto) {

        await this.prisma.user.create({
            data: {
                username: username,
                password: await bcrypt.hash(password, 10),
            },
        });

    }

    async updateUser(id: number, { username, password }: UpdateUserDto) {
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: username,
                password: await bcrypt.hash(password, 10),
            },
        });
    }

    async deleteUser(id: number) {
        await this.prisma.user.delete({
            where: {
                id: id,
            },
        });
    }

}