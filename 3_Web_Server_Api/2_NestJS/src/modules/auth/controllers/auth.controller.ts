import { Controller, Post, Res, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
// Custom
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { SignInDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {

    // Dependency Injection
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() signInDTO: SignInDTO, @Res() response: Response) {

        const data = await this.authService.signIn(signInDTO);

        return response.status(200).send({
            message: 'Sucessful authentication.',
            ...data,
        });

    }

    @Post('signout')
    @UseGuards(AuthGuard)
    async signOut(@Res() response: Response) {

        await this.authService.signOut();

        return response.status(200).send({
            message: 'Session has been expired.'
        });

    }

}