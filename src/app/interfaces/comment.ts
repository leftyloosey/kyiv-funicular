import { User } from './user';

export interface Comment {
  text: string;
  // parent: Comment | null;
  user: User | null;
  usersId: string;
  _id: string;
}
