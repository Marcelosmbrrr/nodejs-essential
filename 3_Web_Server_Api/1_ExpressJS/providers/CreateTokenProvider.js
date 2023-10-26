import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

async function createTokenProvider(userId) {

    // Invalidate all tokens
    await prisma.token.updateMany({
        where: {
            userId: Number(userId)
        },
        data: {
            active: false
        }
    });

    // Create new token
    const token = jwt.sign({}, process.env.SECRET_JWT, {
        subject: userId.toString(),
        expiresIn: "1000s"
    });

    // Save token to database
    await prisma.token.create({
        data: {
            userId: Number(userId),
            token: token,
            active: true,
            expiration: Date.now() + (1000 * 1000)
        }
    });

    return token;

}

export { createTokenProvider }