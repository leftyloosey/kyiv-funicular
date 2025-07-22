import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../components/comment/comment';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment';
import { CommentFormComponent } from '../components/comment-form/comment-form';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  userService = inject(UserService);
  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment(formValues: { text: string }) {
    console.log('home trigggered');
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    // if (!user) {
    //   return;
    // }
    this.commentService
      .createComment({
        text,
        user: '687a4bd8145a3fcf49d332c6',
        // userId: '687a4bd8145a3fcf49d332c6',
        // userId: user._id,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }

  commentTrackBy(_index: number, comment: Comment) {
    return comment._id;
  }
}
