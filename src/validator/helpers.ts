import { body, query, ValidationChain } from 'express-validator';
import { HttpException } from '@utils/errors';
import { statusCodes } from '../constants';
/**
 * Create string validation fields.
 */
export const stringSchema = (
  attribute: string,
  type = 'body',
  optional = false
): ValidationChain => {
  const chainType = type === 'body' ? body : query;
  if (optional) {
    return chainType(attribute)
      .optional()
      .isString()
      .bail()
      .withMessage('must be string');
  }

  return chainType(attribute)
    .exists({ checkFalsy: true })
    .bail()
    .withMessage(`${attribute} is null`)
    .isString()
    .bail()
    .withMessage('must be string');
};

/**
 * Create number validation fields.
 */
export const numberSchema = (
  attribute: string,
  type = 'body',
  optional = false
): ValidationChain => {
  const chainType = type === 'body' ? body : query;
  if (optional) {
    return chainType(attribute)
      .optional()
      .isInt()
      .bail()
      .withMessage('must be an integer');
  }

  return chainType(attribute)
    .exists({ checkFalsy: true })
    .bail()
    .withMessage(`${attribute} is null`)
    .isInt()
    .bail()
    .withMessage('must be an Integer');
};

/**
 * Create float validation fields.
 */
export const floatSchema = (
  attribute: string,
  optional = false
): ValidationChain => {
  if (optional) {
    return body(attribute)
      .optional()
      .isFloat()
      .bail()
      .withMessage('must be float');
  }

  return body(attribute)
    .exists({ checkFalsy: true })
    .bail()
    .withMessage(`${attribute} is null`)
    .isFloat()
    .bail()
    .withMessage('must be float');
};

/**
 * Create date validation field.
 */
export const dateSchema = (
  attribute: string,
  optional = false
): ValidationChain => {
  if (optional) {
    return body(attribute)
      .optional()
      .isISO8601()
      .bail()
      .withMessage('must be valid date 2022-5-20');
  }
  return body(attribute)
    .exists({ checkFalsy: true })
    .bail()
    .withMessage(`${attribute} is null`)
    .isISO8601()
    .bail()
    .withMessage('must be valid date 2022-05-09');
};

/**
 * Create email validation field.
 */
export const emailSchema = (optional = false): ValidationChain => {
  if (optional) {
    return body('email')
      .optional()
      .isEmail()
      .bail()
      .withMessage('must be valid email example@example.com');
  }
  return body('email')
    .exists({ checkFalsy: true })
    .bail()
    .withMessage(`email is null`)
    .isEmail()
    .bail()
    .withMessage('must be valid email example@example.com');
};

/**
 * Create password validation field.
 */
export const passwordSchema = (): ValidationChain => {
  return body('password')
    .exists({ checkFalsy: true })
    .bail()
    .withMessage(`password is null`)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10
    })

    .bail()
    .withMessage(
      'password is weak must be min length of 8 and  have one upper,one lower,one number and one special character'
    );
};

//TODO:delete
// /**
//  * Create a custom validator to check one of the givin attributes must exist.
//  */
// export const atLeastOne = (attributeList: string[]) => {
//   return body().custom((value, { req }) => {
//     let exist = false;
//     for (const attribute of attributeList) {
//       if (attribute in req.body) {
//         exist = true;
//         break;
//       }
//     }
//     if (!exist)
//       throw new HttpException(
//         statusCodes.badRequest,
//         `At least one of ${attributeList} must exist`
//       );
//     return exist;
//   });
// };
