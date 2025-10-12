import { UserModel } from '../user';

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  user: UserModel;
};
