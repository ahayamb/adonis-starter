import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  public async index(ctx: HttpContextContract) {
    ctx.response
      .status(400)
      .json({message: "Unauthenticated"});
  }

}
