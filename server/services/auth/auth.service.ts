import { IUser } from '../../../common/models/user';

const loginService = (username: string, password: string): Promise<IUser> => {
  return Promise.resolve({
    id: 0,
    username: 'Username'
  });
};

export { loginService };
