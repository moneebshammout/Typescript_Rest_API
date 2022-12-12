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
        queryInterface.removeConstraint('category', 'user_id'),
        queryInterface.removeConstraint('expense', 'user_id'),
        queryInterface.removeConstraint('expense', 'category_id')
      ]);
    })
};
