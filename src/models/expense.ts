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
  public id!: number;
  public user_id!: number;
  public category_id!: number;
  public amount!: number;
  public spending_date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
