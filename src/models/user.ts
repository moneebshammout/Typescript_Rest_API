import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  salt: string;
  last_login: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserInput = Optional<UserAttributes, 'id'>;
export type UserOutput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public salt!: string;
  public last_login!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_login: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'user',
      freezeTableName: true,
      timestamps: true,
      underscored: true
    }
  );
  return User;
};
