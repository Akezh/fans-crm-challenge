import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: true,
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
