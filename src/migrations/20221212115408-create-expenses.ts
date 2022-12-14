'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('expense', {
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
      });
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('expense');
    })
};
