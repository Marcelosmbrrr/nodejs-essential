import { Injectable, Body, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
// Custom
import { PrismaService } from 'src/modules/global/prisma/prisma.service';
import { SignInDTO } from '../dto/auth.dto';

@Injectable()
export class AuthService {

    // Dependency Injection
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    async signIn(@Body() data: SignInDTO) {
        const { username, password } = data;

        const user = await this.prismaService.user.findUnique({
            where: { username: username },
        });

        if (!user) {
            throw new UnauthorizedException('Wrong credentials');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new UnauthorizedException('Wrong password');
        }

        // Create JWT token
        const jwtToken = await this.jwtService.signAsync({
            userId: user.id
        });

        // Invalidate previous tokens
        await this.prismaService.token.updateMany({
            where: {
                userId: user.id,
            },
            data: {
                valid: false,
            },
        });

        // Create new token record
        await this.prismaService.token.create({
            data: {
                token: jwtToken,
                userId: user.id,
            },
        });

        const payload = {
            message: 'Successful authentication',
            user: {
                id: user.id,
            },
            token: jwtToken,
        };

        return payload;
    }

    async signOut() {
        return true;
    }
}