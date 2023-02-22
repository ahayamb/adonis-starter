/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';
import AutoSwagger from 'adonis-autoswagger';
import AuthController from 'App/Controllers/Http/AuthController';
import User from 'App/Models/User';
import AuthLoginValidator from 'App/Validators/AuthLoginValidator';
import swagger from 'Config/swagger';


Route.get("/swagger", async () => {
  // return Route.toJSON();
  return AutoSwagger.docs(Route.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
Route.get("/docs", async () => {
  return AutoSwagger.ui("/swagger");
});

/**
 * @responseBody
 */
Route.get('/home', async () => ({nama: "Hero"}));

Route.group(() => {
  Route.post('', async (ctx: HttpContextContract) => {
    await ctx.request.validate(AuthLoginValidator);
    return new AuthController().index(ctx);
  });
}).prefix('/auth/');

Route.group(() => {
  Route.get('', 'UsersController.index');
}).prefix('/user/');

Route.group(() => {
  Route.get('data', async () => {
    return Database.from("sample_data").select('*');
  });

  Route.post('create', async (ctx: HttpContextContract) => {
    const body = ctx.request.body();

    if (ctx.request.hasBody() && body?.username && body?.password) {
      const user = new User();

      user.username = body.username;
      user.password = body.password;

      await user.save();
    }
  });

  Route.post('auth', async (ctx: HttpContextContract) => {
    const body = ctx.request.body();

    if (ctx.request.hasBody() && body?.username && body?.password) {
      const user = await ctx.auth.use('api').verifyCredentials(body.username, body.password);
      await user.load('roles');
      const token = await ctx.auth.use('api').attempt(body.username, body.password, {userInfo: user.serialize()});
      return token;
    }
  });

  Route.get('me', async ({auth}) => {
    await auth.use('api').authenticate();
    const userInfo = auth.use('api').token?.meta?.userInfo;
    return userInfo;
  }).middleware("auth");

  Route.get('user', async () => {
    const user = await User.query().preload('roles', (roleQuery) => {
      roleQuery.preload('permissions');
    });

    return user;
  });

}).prefix('/example/');

Route.get('/', async () => {
  return { hello: 'world' };
});
