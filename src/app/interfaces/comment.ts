import { User } from './user';

export interface Comment {
  text: string;
  parent: Comment | null;
  user: User;
  _id: string;
}
