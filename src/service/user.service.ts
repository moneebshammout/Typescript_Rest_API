import { RequestHandler, Request, Response } from 'express';
import { User } from '@models/index';
import { UserAttributes } from '@models/user';
import { formatResponse } from '@utils/requests';
import { hashPassword, generateAuthToken, checkPassword } from '@utils/auth';
import { currentDate } from '@utils/date';
import { getCache } from '@utils/redis';
import { JWT_HEADER } from '../constants';

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

  await User.alreadyExist({ email });
  const { salt, hashedPassword } = await hashPassword(password);
  const user = await User.create({
    email,
    name,
    salt,
    password: hashedPassword,
    lastLogin: currentDate()
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

  const user = (await User.doesNotExist({
    email
  })) as unknown as UserAttributes | null;
  //it will not be null because it will throw an exception.
  if (user === null) return;

  await checkPassword(password, user.password);
  const cachedSession: string | null = await getCache(email);
  let token: string;

  if (cachedSession) {
    token = cachedSession;
  } else {
    token = await generateAuthToken({ email, id: user.id });
    const lastLogin: Date = currentDate();
    await User.update(
      {
        lastLogin
      },
      { where: { email } }
    );
    user.lastLogin = lastLogin;
  }

  res
    .header(JWT_HEADER, token)
    .send(
      formatResponse(
        user,
        cachedSession ? 'session from cache' : 'session created'
      )
    );
};
