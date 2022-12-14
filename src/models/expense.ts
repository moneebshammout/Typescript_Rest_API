import { DataTypes, Optional } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import BaseModel from './base';

export interface ExpenseAttributes {
  id?: number;
  userId: number;
  categoryId: number;
  amount: number;
  spendingDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ExpenseInput = Optional<ExpenseAttributes, 'id'>;
export type ExpenseOutput = Required<ExpenseAttributes>;

class Expense
  extends BaseModel<ExpenseAttributes, ExpenseInput>
  implements ExpenseAttributes
{
  declare id: number;
  declare userId: number;
  declare categoryId: number;
  declare amount: number;
  declare spendingDate: Date;
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
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'user_id'
      },
      categoryId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'category_id'
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      spendingDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'spending_date'
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
      modelName: 'expense',
      freezeTableName: true,
      timestamps: true
    }
  );
  return Expense;
};
