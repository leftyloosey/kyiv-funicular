import { Component, inject, input } from '@angular/core';
import { Comment } from '../../../utils/interfaces/comment';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CommentService } from '../../../services/comment-service/comment.service';

@Component({
  selector: 'app-comment2',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './comment2.html',
  styleUrl: './comment2.scss',
})
export class Comment2 {
  comt = inject(CommentService);
  public comment = input.required<Comment>();
  comments$ = toObservable(this.comment);
}
