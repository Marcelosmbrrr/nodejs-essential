
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt/dist';

// Middleware functions have access to the request and response objects, and the next() middleware function in the application’s request-response cycle
// Obs: This application is using guards instead of middlewares
// Souce: https://docs.nestjs.com/middleware

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService) { }

    use(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            res.status(401).json({ message: 'Unauthorized. Error: Authorization header is missing.' });
        }

        const token = req.headers.authorization.replace('Bearer', '').trim()

        if (!token) {
            res.status(401).json({ message: 'Unauthorized. Error: Token is missing.' });
        }

        const tokenPayload = this.jwtService.verify(token, { publicKey: process.env.JWT_PUBLIC_KEY });

        if (!tokenPayload) {
            res.status(401).json({ message: 'Unauthorized. Error: Invalid token.' });
        }

        req['user'] = tokenPayload;
        next();
    }
}
