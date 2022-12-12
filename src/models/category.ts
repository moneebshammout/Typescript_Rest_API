import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

interface CategoryAttributes {
  id?: number;
  name: string;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CategoryInput = Optional<CategoryAttributes, 'id'>;
export type CategoryOutput = Required<CategoryAttributes>;

class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  declare id: number;
  declare user_id: number;
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
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'category',
      freezeTableName: true,
      timestamps: true,
      underscored: true
    }
  );
  return Category;
};
