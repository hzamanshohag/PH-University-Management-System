import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import { HttpStatus } from 'http-status-ts';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if the token is sent from the client
    if (!token) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // checking role & id
    const { role, userId, iat } = decoded;

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
      User.isJWTIssuedBeforePassword(
        currentUser.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'This are not authorized !');
    }
    
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // decoded undefined
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
