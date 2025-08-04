import {
  Component,
  Input,
  OnInit,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../interfaces/comment';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Book } from '../../interfaces/book';
import { CommentFormComponent } from '../comment-form/comment-form';
// import { placeholder } from '../../assets/images/placeholder.png';
@Component({
  selector: 'app-comment',
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.html',
  styleUrls: ['./comment.css'],
})
export class CommentComponent implements OnInit {
  comment = input.required<Comment>();
  deleteBook = output<Book>();
  hasClickedReply: boolean = false;
  smallReplyBox: boolean = false;
  // commentService = inject(CommentService);
  // authService = inject(AuthService);
  nestedComments = signal<Comment[]>([]);
  constructor() {
    // console.log(this.comment());
  }
  ngOnInit(): void {
    // console.log(this.comment());
  }

  clickReply() {
    this.hasClickedReply = !this.hasClickedReply;
  }
  // imgSrc = placeholder;
  // createComment(formValues: { text: string }) {
  //   const { text } = formValues;
  //   const user = this.authService.getUserFromStorage();
  //   if (!user) {
  //     return;
  //   }
  //   this.commentService.createComment({
  //     text,
  //     user: user._id,
  //   });
  // }
}
