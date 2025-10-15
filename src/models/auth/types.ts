import { UserModel } from '../user';

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  token: string;
  user: UserModel;
};
