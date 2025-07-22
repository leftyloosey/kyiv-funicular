import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CommentFormComponent } from '../comment-form/comment-form';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment',
  imports: [CommonModule],
  // imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.html',
  styleUrls: ['./comment.css'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  commentService = inject(CommentService);
  userService = inject(UserService);
  nestedComments = signal<Comment[]>([]);

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text,
      user: user._id,
    });
    // this.commentService.createComment({
    //   text,
    //   userId: user._id,
    //   parentId: this.comment._id,
    // });
  }
}
