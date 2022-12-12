import { RequestHandler, Request, Response } from 'express';
import { User } from '@models/index';
import { HttpException } from '@utils/errors';
import { formatResponse } from '@utils/requests';
import { hashPassword, generateAuthToken, checkPassword } from '@utils/auth';
import { currentDate } from '@utils/date';
import { JWT_HEADER, statusCodes } from '../constants';

/**
 * Creates user,generate jwt token and save session.
 */
export const register: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    email,
    name,
    password
  }: { email: string; name: string; password: string } = req.body;

  const alreadyExist = await User.findOne({
    where: { email }
  });

  if (alreadyExist != null) {
    throw new HttpException(
      statusCodes.conflict,
      'A user with this email already exist'
    );
  }

  const { salt, hashedPassword } = await hashPassword(password);
  const user = await User.create({
    email,
    name,
    salt,
    password: hashedPassword,
    last_login: currentDate()
  });

  const token: string = await generateAuthToken({ email, id: user.id });

  res
    .header(JWT_HEADER, token)
    .send(formatResponse(user, `User and session created`));
};

/**
 * Logs user in,generate jwt token and save session.
 */
export const login: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  const user = await User.findOne({
    where: { email }
  });

  if (user === null) {
    throw new HttpException(statusCodes.notFound, 'User not found');
  }

  await checkPassword(password, user.password);
  const token: string = await generateAuthToken({ email, id: user.id });

  res.header(JWT_HEADER, token).send(formatResponse(user, `session created`));
};
