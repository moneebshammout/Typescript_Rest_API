'use strict';

import { Options } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configDB = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const config: Options = configDB[env as keyof typeof configDB];
import UserInit from './user';
import CategoryInit from './category';
import ExpenseInit from './expense';

/**
 * Initialize db connection
 */
const sequelize: Sequelize = new Sequelize(
  config.database ?? 'tempDB',
  config.username ?? 'postmoneeb',
  config.password ?? 'shammout123',
  config
);

/**
 * Models initializing
 */
const User = UserInit(sequelize);
const Category = CategoryInit(sequelize);
const Expense = ExpenseInit(sequelize);

/**
 * Models associations.
 */
User.hasMany(Category);
Category.belongsTo(User, {
  foreignKey: {
    name: 'user_id'
  }
});

User.hasMany(Expense);
Expense.belongsTo(User, {
  foreignKey: {
    name: 'user_id'
  }
});

Category.hasMany(Expense);
Expense.belongsTo(Category, {
  foreignKey: {
    name: 'category_id'
  }
});

export { sequelize, Sequelize, User, Category, Expense };
