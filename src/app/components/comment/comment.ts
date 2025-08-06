import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';
import { ReplyComment } from '../reply-comment/reply-comment';
import { CommentFormComponent } from '../comment-form/comment-form';
@Component({
  selector: 'app-comment',
  imports: [CommonModule, ReplyComment],
  templateUrl: './comment.html',
  styleUrls: ['./comment.css'],
})
export class CommentComponent {
  comment = input.required<Comment>();
  isProfileComment = input.required<boolean>();

  hasClickedReply: boolean = false;
  replySize = signal<boolean>(false);

  commentService = inject(CommentService);
  nestedComments = signal<Comment[]>([]);

  setComments() {
    this.commentService.getComments(this.comment().id).subscribe((comments) => {
      this.nestedComments.set(comments);
    });
  }

  clickReply() {
    this.hasClickedReply = !this.hasClickedReply;
    this.setComments();
  }
  clickDelete(id: string) {
    console.log(id);
    this.commentService.deleteComment(id);
  }
}
