import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'init_tables'

  public async up () {
    this.schema.raw(
      `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE "user" (
        "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
        "username" varchar(50),
        "password" varchar(200),
        "remember_me_token" varchar(200),
        "created_at" timestamptz DEFAULT (current_timestamp),
        "updated_at" timestamptz DEFAULT (current_timestamp)
      );

      CREATE TABLE "role" (
        "id" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
        "rolename" varchar(50),
        "created_at" timestamptz DEFAULT (current_timestamp),
        "updated_at" timestamptz DEFAULT (current_timestamp)
      );

      CREATE TABLE "permission" (
        "id" int PRIMARY KEY,
        "permission_name" varchar(50),
        "created_at" timestamptz DEFAULT (current_timestamp),
        "updated_at" timestamptz DEFAULT (current_timestamp)
      );

      CREATE TABLE "role_permission" (
        "role_id" uuid,
        "permission_id" int,
        "created_at" timestamptz DEFAULT (current_timestamp),
        "updated_at" timestamptz DEFAULT (current_timestamp),
        PRIMARY KEY ("role_id", "permission_id")
      );

      CREATE TABLE "user_role" (
        "user_id" uuid,
        "role_id" uuid,
        PRIMARY KEY ("user_id", "role_id")
      );

      ALTER TABLE "role_permission" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

      ALTER TABLE "role_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "permission" ("id");

      ALTER TABLE "user_role" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

      ALTER TABLE "user_role" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");`
    );
  }

  public async down () {
    this.schema.raw(`
      DROP TABLE "user_role";
      DROP TABLE "role_permission";
      DROP TABLE "permission";
      DROP TABLE "role";
      DROP TABLE "user";
    `);
  }
}
