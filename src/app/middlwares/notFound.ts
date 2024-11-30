/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import {HttpStatus}  from 'http-status-ts';


const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message:'API not found',
    error: '',
  });
};
export default notFound;
