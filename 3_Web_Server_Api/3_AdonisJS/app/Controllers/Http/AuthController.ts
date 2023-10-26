import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Hash from '@ioc:Adonis/Core/Hash';
import { schema } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class AuthController {

    public async login({ request, response, auth }: HttpContextContract) {

        const loginSchema = schema.create({
            username: schema.string(),
            password: schema.string()
        });

        const { username, password } = await request.validate({ schema: loginSchema });

        // Lookup user manually
        const user = await User
            .query()
            .where('username', username)
            .firstOrFail()

        // Verify password
        if (!(await Hash.verify(user.password, password))) {
            return response.unauthorized('Invalid credentials')
        }

        // Generate token
        const token = await auth.use('api').generate(user, {
            expiresIn: '30 mins'
        })

        response.status(200).send({
            message: 'Successfully logged in.',
            user: user.toJSON(),
            token: token.toJSON()
        });

    }

    public async logout({ response, auth }: HttpContextContract) {

        await auth.use('api').revoke();

        response.status(200).send({
            message: 'Successfully logged out.'
        });

    }

}
