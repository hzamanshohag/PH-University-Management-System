export type Tuser = {
  id: string;
  password: string;
  needspasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'block';
  isDelete: boolean;
};


