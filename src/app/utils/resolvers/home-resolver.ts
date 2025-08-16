import { inject } from '@angular/core';
import { CommentService } from '../../services/comment-service/comment.service';
// import { CommentService } from '../../services/comment-service/comment.service';
import { Comment } from '../interfaces/comment';
import type {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export const homeResolver: ResolveFn<Observable<Array<Comment>>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const comt = inject(CommentService);

  return comt.getComments();
};
