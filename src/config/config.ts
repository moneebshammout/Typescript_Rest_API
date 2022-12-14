import { Options } from 'sequelize';
require('@babel/register');
import dotenv from 'dotenv';

dotenv.config();
interface ConfigTs {
  development: Options;
  test: Options;
  production: Options;
}

const configDB: ConfigTs = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: 'postgres',
    logging: false
  }
};

module.exports = configDB;
