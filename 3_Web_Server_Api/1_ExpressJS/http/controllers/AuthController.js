import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
// Provider
import { createTokenProvider } from '../../providers/CreateTokenProvider.js';

const prisma = new PrismaClient()

const AuthController = {
    login: async (req, res) => {
        try {

            const user = await prisma.user.findUnique({
                where: {
                    username: req.body.username
                }
            });

            if (!user) {
                throw new Error('Invalid credentials.');
            }

            const password_match = await bcrypt.compare(req.body.password, user.password);

            if (!password_match) {
                throw new Error('Invalid credentials.');
            }

            // Create Access Token
            const tokenJwt = createTokenProvider(user.id);

            res.status(200).send({
                message: 'Login successful.',
                tokenJwt,
                user
            });


        } catch (error) {
            if (error.message === 'Invalid credentials.') {
                res.status(401).send({ message: error.message });
            } else {
                res.status(500).send({ message: error.message });
            }
        }
    },
    logout: async (req, res) => {
        try {

            const userId = req.user.id; // from middleware

            await prisma.token.update({
                where: {
                    userId: Number(userId)
                },
                data: {
                    is_valid: false
                },
            });

            res.status(200).send({ message: 'Logout successful.' });

        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export { AuthController };