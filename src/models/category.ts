import { DataTypes, Optional } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import BaseModel from './base';

interface CategoryAttributes {
  id?: number;
  name: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CategoryInput = Optional<CategoryAttributes, 'id'>;
export type CategoryOutput = Required<CategoryAttributes>;

class Category
  extends BaseModel<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  declare id: number;
  declare userId: number;
  declare name: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  Category.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'user_id'
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
      }
    },
    {
      sequelize,
      modelName: 'category',
      freezeTableName: true,
      timestamps: true
    }
  );
  return Category;
};
