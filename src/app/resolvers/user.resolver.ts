import { inject } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { AuthService } from '../services/auth.service';
import { Comment } from '../interfaces/comment';
import type {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
export const commentResolver: ResolveFn<Comment[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const comt = inject(CommentService);

  const userId = auth.token.getUserId();

  return comt.getUserComments(userId);
};
