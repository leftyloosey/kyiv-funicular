import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';
import { ReplyComment } from '../reply-comment/reply-comment';
@Component({
  selector: 'app-comment',
  imports: [CommonModule, ReplyComment],
  templateUrl: './comment.html',
  styleUrls: ['./comment.css'],
})
export class CommentComponent {
  comment = input.required<Comment>();

  hasClickedReply: boolean = false;
  replySize = signal<boolean>(false);
  // smallReplyBox: boolean = false;
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
}
