import {
  Component,
  effect,
  inject,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../../components/comment/comment';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment';
import { CommentFormComponent } from '../../components/comment-form/comment-form';
import { AuthService } from '../../services/auth.service';
import { commentSignal } from '../../signals';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnChanges {
  commentService = inject(CommentService);
  authService = inject(AuthService);
  comments = signal<Comment[]>([]);

  constructor() {
    this.getComments();
    effect(() => {
      this.getComments();

      if (commentSignal().entry.length)
        this.createComment(commentSignal().entry, commentSignal().parentId);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment(text: string, parentId: string) {
    const userId = this.authService.token.getUserId();
    console.log('OBJECT ABOUT TO BE SUBMITTED', {
      text: text,
      userId: userId,
      parentId: parentId,
    });
    this.commentService
      .createComment({
        text,
        user: userId,
        parentId: parentId,
      })
      .subscribe((createdComment) => {
        this.comments.set([...this.comments(), createdComment]);
      });
  }
}
