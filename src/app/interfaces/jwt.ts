import { JwtPayload } from 'jwt-decode';

export interface UserPayload extends JwtPayload {
  userName?: string;
  userId?: string;
}
