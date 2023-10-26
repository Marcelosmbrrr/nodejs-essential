import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class UsersController {

  public async index({ response }: HttpContextContract) {

    const users = await User.all();

    response.status(200).send({
      message: 'Successfully retrieved users.',
      users: users
    });

  }

  public async store({ request, response }: HttpContextContract) {

    const storeSchema = schema.create({
      username: schema.string(),
      password: schema.string()
    });

    const payload = await request.validate({ schema: storeSchema });

    const user = await User.create(payload);

    response.status(201).send({
      message: 'Successfully created user.',
      user: user
    });

  }

  public async update({ request, response }: HttpContextContract) {

    const updateSchema = schema.create({
      username: schema.string(),
      password: schema.string()
    });

    const payload = await request.validate({ schema: updateSchema });

    const user = await User
      .query()
      .where('id', request.param('id'))
      .update(payload)

    response.status(201).send({
      message: 'Successfully updated user.',
      user: user
    });

  }

  public async destroy({ request, response }: HttpContextContract) {

    const user = await User.findOrFail(request.param('id'));
    await user.delete();

    response.status(200).send({
      message: 'Successfully deleted user.',
      user: user
    });

  }

}
