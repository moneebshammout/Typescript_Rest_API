import bcrypt from 'bcrypt';
import { HttpException } from '@utils/errors';

/**
 * Hashes password and returns the hashed password with the salt.
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return {
    salt,
    hashedPassword
  };
};

/**
 * Authenticates user by checking the password with the salt.
 *
 */
export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  const valid = await bcrypt.compare(password, hashedPassword);

  if (!valid) {
    throw new HttpException(403, 'Wrong password');
  }
};

// /**
//  * Generates JWT token.
//  *
//  * @param {string} privateKey Name of private key.
//  * @param {object} credentials Credentials to sign for JWT.
//  *
//  * @return {string} Token.
//  */
// const generateAuthToken = (privateKey:string, credentials) => {
//   if (!config.has(privateKey)) {
//     throw new BadRequest('NO JWT PRIVATE KEY');
//   }

//   return jwt.sign(credentials, config.get(privateKey));
// };
