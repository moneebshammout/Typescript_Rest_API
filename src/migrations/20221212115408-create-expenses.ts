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
