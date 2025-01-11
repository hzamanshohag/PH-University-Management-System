import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

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
  if (
    !(await User.isPasswordMatched(payload?.password, currentUser?.password))
  ) {
    throw new AppError(HttpStatus.FORBIDDEN, 'Password do not match !');
  }

  // Access Granted: Send AccessToken, RefreshToken

  // Create token and send to the client
  const jwtPayload = {
    userId: currentUser.id,
    role: currentUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: currentUser?.needspasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  //checking if the user is exist
  const currentUser = await User.isUserExistsByCustomId(user.userId);
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
  if (
    !(await User.isPasswordMatched(payload?.oldPassword, currentUser?.password))
  ) {
    throw new AppError(HttpStatus.FORBIDDEN, 'Password do not match !');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needspasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  // checking role & id
  const { userId, iat } = decoded;

  const currentUser = await User.isUserExistsByCustomId(userId);
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

  //
  if (
    currentUser.passwordChangedAt &&
    User.isJWTIssuedBeforePassword(currentUser.passwordChangedAt, iat as number)
  ) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'This are not authorized !');
  }

   const jwtPayload = {
     userId: currentUser.id,
     role: currentUser.role,
   };
   const accessToken = createToken(
     jwtPayload,
     config.jwt_access_secret as string,
     config.jwt_access_expires_in as string,
   );

   return { accessToken };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
