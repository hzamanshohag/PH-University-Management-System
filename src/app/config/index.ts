import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.POST,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_round: process.env.Bcrypt_Salt_Round,
};
