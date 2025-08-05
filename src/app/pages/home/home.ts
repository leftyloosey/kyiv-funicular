import { Component, inject, signal, effect } from '@angular/core';
// import { FormsModule } from '@angular/forms';
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
export class HomeComponent {
  commentService = inject(CommentService);
  authService = inject(AuthService);
  comments = signal<Comment[]>([]);

  constructor() {
    this.getComments();
    effect(() => {
      if (commentSignal().entry.length && commentSignal().parentId?.length)
        this.createReplyComment(
          commentSignal().entry,
          commentSignal().parentId
        );
      else if (commentSignal().entry.length) {
        this.createComment(commentSignal().entry);
      } else return;
    });
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }
  createComment(text: string) {
    const userId = this.authService.token.getUserId();

    this.commentService
      .createComment({
        text,
        user: userId,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }
  createReplyComment(text: string, parentId: string) {
    const userId = this.authService.token.getUserId();

    this.commentService
      .createComment({
        text,
        user: userId,
        parentId,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }
}
