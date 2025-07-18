import { User } from './user';

export interface Comment {
  text: string;
  parent: Comment | null;
  user: User | null;
  _id: string;
}
