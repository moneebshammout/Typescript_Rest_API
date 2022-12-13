'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await Promise.all([
        queryInterface.addConstraint('category', {
          fields: ['user_id'],
          type: 'foreign key',
          references: {
            table: 'user',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('expense', {
          fields: ['user_id'],
          type: 'foreign key',
          references: {
            table: 'user',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('expense', {
          fields: ['category_id'],
          type: 'foreign key',
          references: {
            table: 'category',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      ]);
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await Promise.all([
        queryInterface.removeConstraint('category', 'category_user_id_user_fk'),
        queryInterface.removeConstraint('expense', 'expense_user_id_user_fk'),
        queryInterface.removeConstraint(
          'expense',
          'expense_category_id_category_fk'
        )
      ]);
    })
};
