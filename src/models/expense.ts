import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

interface ExpenseAttributes {
  id?: number;
  user_id: number;
  category_id: number;
  amount: number;
  spending_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ExpenseInput = Optional<ExpenseAttributes, 'id'>;
export type ExpenseOutput = Required<ExpenseAttributes>;

class Expense
  extends Model<ExpenseAttributes, ExpenseInput>
  implements ExpenseAttributes
{
  declare id: number;
  declare user_id: number;
  declare category_id: number;
  declare amount: number;
  declare spending_date: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  Expense.init(
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
      category_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      spending_date: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'expense',
      freezeTableName: true,
      timestamps: true,
      underscored: true
    }
  );
  return Expense;
};
