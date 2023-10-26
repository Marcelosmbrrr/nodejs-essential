import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

async function verifyTokenProvider(token) {

    const userId = decodeJsonWebToken(token);
    await verifyTokenValidity(token, userId);

    return userId;

}

function decodeJsonWebToken(token) {

    const tokenDecoded = jwt.verify(token, process.env.SECRET_JWT, (err, payload) => {
        if (err) {
            return false;
        }
        return payload;
    });

    if (!tokenDecoded) {
        throw new Error('Unauthorized. Error: Token is invalid.');
    }

    return tokenDecoded.userId;

}

async function verifyTokenValidity(token, userId) {

    // Find token record
    const tokenRecord = await prisma.token.findOne({
        where: {
            userId: Number(userId),
            token: token
        }
    });

    if (!tokenRecord) {
        throw new Error('Unauthorized. Error: Token not found.');
    }

    if (tokenRecord.expiration < Date.now()) {

        await prisma.token.update({
            where: {
                userId: Number(userId),
                token: token
            },
            data: {
                active: false
            }
        });

        throw new Error('Unauthorized. Error: Token expired.');

    }

    if (!tokenRecord.active) {
        throw new Error('Unauthorized. Error: Token inactive.');
    }

    return true;

}

export { verifyTokenProvider }