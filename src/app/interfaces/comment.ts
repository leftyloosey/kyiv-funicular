import { User } from './user';

export interface Comment {
  text: string;
  parentId: Comment | null;
  user: User | null;

  usersId: string;
  _id: string;
  timestamp: Date;
}
