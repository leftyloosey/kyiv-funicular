// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-comment',
//   imports: [],
//   templateUrl: './comment.html',
//   styleUrl: './comment.scss'
// })
// export class Comment {

// }
import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  // imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.html',
  styleUrls: ['./comment.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpanded = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService);
  userService = inject(UserService);
  nestedComments = signal<Comment[]>([]);

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService
        .getComments(this.comment._id)
        .subscribe((comments) => {
          this.nestedComments.set(comments);
        });
    }
  });

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpanded.set(true);
    }
  }

  // toggleExpanded() {
  //   this.isExpanded.set(!this.isExpanded());
  // }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text,
      userId: user._id,
      parentId: this.comment._id,
    });
    // .subscribe((createdComment) => {
    //   this.nestedComments.set([createdComment, ...this.nestedComments()]);
    // });
  }

  commentTrackBy(_index: number, comment: Comment) {
    return comment._id;
  }
}
