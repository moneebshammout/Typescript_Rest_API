/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Model,
  WhereOptions,
  ModelAttributes,
  CreationAttributes
} from 'sequelize';
import { HttpException } from '@utils/errors';
import { statusCodes } from '../constants';

/**
 * A base class to create custom method for all instances.
 */
export default class BaseModel<
  ModelAttributes,
  CreationAttributes
> extends Model {
  /**
   * Checks if entity exist and throws an exception.
   */
  static async alreadyExist(where: WhereOptions): Promise<void> {
    const result = await this.findOne({ where });
    if (result !== null) {
      throw new HttpException(
        statusCodes.conflict,
        ` ${this.tableName} already exist`
      );
    }
  }

  /**
   * Checks if entity does not exist and throws an exception.
   */
  static async doesNotExist(where: WhereOptions) {
    const result = await this.findOne({ where });
    if (result === null) {
      throw new HttpException(
        statusCodes.notFound,
        ` ${this.tableName} does not exist`
      );
    }

    return result;
  }
}
