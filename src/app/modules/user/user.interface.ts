/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type Tuser = {
  id: string;
  password: string;
  needspasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'block';
  isDelete: boolean;
};

export interface UserModel extends Model<Tuser> {
  isUserExistsByCustomId(id: string): Promise<Tuser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
