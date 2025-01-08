import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUser } from './auth.interface';

const loginUser = async (payload: TUser) => {
  //checking if the user is exist
  const currentUser = await User.isUserExistsByCustomId(payload.id);
  if (!currentUser) {
    throw new AppError(HttpStatus.NOT_FOUND, 'This user is not found !');
  }
  //checking if the user is already deleted

  if (currentUser.isDelete === true) {
    throw new AppError(HttpStatus.FORBIDDEN, 'This user is deleted!');
  }

  //   //checking if the user is already blocked
  if (currentUser.status === 'block') {
    throw new AppError(HttpStatus.FORBIDDEN, 'This user is blocked !');
  }

  //   //checking if the password is correct
  if (!(await User.isPasswordMatched(payload.password, currentUser.password))) {
    throw new AppError(HttpStatus.FORBIDDEN, 'Invalid password !');
  }

  // Access Granted: Send AccessToken, RefreshToken
  return {};
};
export const AuthServices = {
  loginUser,
};
