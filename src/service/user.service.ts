import { RequestHandler, Request, Response } from 'express';
import { User } from '@models/index';
import { HttpException } from '@utils/errors';
import { formatResponse } from '@utils/requests';
import { hashPassword } from '@utils/auth';
import { currentDate } from '@utils/date';
/**
 * Create user.
 */
export const createUser: RequestHandler = async (
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
    throw new HttpException(409, 'A user with this email already exist');
  }
  const { salt, hashedPassword } = await hashPassword(password);
  const user = await User.create({
    email,
    name,
    salt,
    password: hashedPassword,
    last_login: currentDate()
  });

  res.send(formatResponse(user, `User Paid Feed fetched`));
};
