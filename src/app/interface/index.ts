// types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload; // `user` can be optional, depending on your implementation
  }
}
