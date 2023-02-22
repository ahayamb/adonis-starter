import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthLoginValidator {

  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.required()]),
    password: schema.string({}, [rules.required()])
  });

  public messages: CustomMessages = {
    required: '{{ field }} diperlukan',
    'email.email': 'format email tidak sesuai'
  };

}
