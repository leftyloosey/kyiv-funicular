import { inject } from '@angular/core';
import { CommentService } from '../../services/comment-service/comment.service';
// import { CommentService } from '../../services/comment-service/comment.service';
import { AuthService } from '../../services/auth-service/auth.service';
// import { AuthService } from '../../services/auth-service/auth.service';
import { Comment } from '../interfaces/comment';
import type {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export const commentResolver: ResolveFn<Observable<Array<Comment>>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const comt = inject(CommentService);

  const userId = auth.getUserId();

  return comt.getCommentsByUser(userId);
};
