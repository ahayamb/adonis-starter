import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from './Permission';

export default class Role extends BaseModel {

  public static table = 'role';

  @column({ isPrimary: true })
  public id: string

  @column()
  public rolename: string;

  @manyToMany(() => Permission, {
    pivotTable: 'role_permission',
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id'
  })
  public permissions: ManyToMany<typeof Permission>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
