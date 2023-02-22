import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {

  public async index(ctx: HttpContextContract) {

    const users = [
      {
        name: "John Doe",
        email: "johndoe@gmail.com",
        role: "USER"
      },
      {
        name: "Ahmad Hayam",
        email: "ahayambr@gmail.com",
        role: "SUPER ADMIN"
      },
      {
        name: "Dewi Aisyah",
        email: "dewi@gmail.com",
        role: "ADMIN"
      }
    ];

    ctx.response
      .status(200)
      .json(users);
  }

}
