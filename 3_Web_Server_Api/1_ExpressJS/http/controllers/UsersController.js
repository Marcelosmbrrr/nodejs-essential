import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

const UsersController = {

    getUsers: async (req, res) => {
        try {

            const users = await prisma.user.findMany();
            res.status(200).send({
                message: 'Users loaded successfully',
                users
            });

        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    createUser: async (req, res) => {
        try {

            const user = await prisma.user.create({
                data: {
                    username: req.body.username,
                    password: await bcrypt.hash(req.body.password, 10),
                }
            });

            res.status(200).send({
                message: 'User created successfully',
                user
            });

        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {

            const user = await prisma.user.findUnique({
                where: {
                    id: Number(req.params.identifier)
                }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const userUpdated = await prisma.user.update({
                where: {
                    id: Number(req.params.identifier)
                },
                data: {
                    username: req.body.username,
                    password: await bcrypt.hash(req.body.password, 10)
                }
            });

            res.status(200).send({
                message: 'User updated successfully',
                user: userUpdated
            });

        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {

            const user = await prisma.user.findUnique({
                where: {
                    id: Number(req.params.identifier)
                }
            });

            if (!user) {
                throw new Error('User not found');
            }

            await prisma.user.delete({
                where: {
                    id: Number(req.params.identifier)
                }
            });

            res.status(200).send({
                message: 'User deleted successfully'
            });

        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export { UsersController };