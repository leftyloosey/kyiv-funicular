import {
  Component,
  OnInit,
  inject,
  signal,
  input,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../components/comment/comment';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment';
import { CommentFormComponent } from '../components/comment-form/comment-form';
import { AuthService } from '../services/auth.service';
import { Book } from '../interfaces/book';
import { commentSignal } from '../signals';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  commentService = inject(CommentService);
  authService = inject(AuthService);
  // comments = <Comment[]>[];
  comments = signal<Comment[]>([]);

  constructor() {
    this.getComments();
    effect(() => {
      console.log('Global signal value changed:', commentSignal());
      if (commentSignal().entry.length)
        this.createComment(commentSignal().entry);
    });
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }
  createComment(text: string) {
    const userId = this.authService.token.getUserId();
    console.log('text', text, 'user: ', userId);

    this.commentService
      .createComment({
        text,
        user: userId,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }

  // angularBook = {
  //   title: 'Angular Core Deep Dive',
  //   synopsis: 'A deep dive into Angular core concepts',
  // };
  // deleteBookEvent(book: Book) {
  //   console.log(book);
  //   console.log('and do other stuff as well');
  //   this.angularBook.title = '';
  //   this.angularBook.synopsis = '';
  // }
  // createComment(formValues: { text: string }) {
  //   console.log('home triggered', typeof formValues);
  //   const { text } = formValues;
  //   const user = this.authService.getUserFromStorage();
  //   this.commentService
  //     .createComment({
  //       text,
  //       user: user?.id,
  //     })
  //     .subscribe((createdComment) => {
  //       this.comments.set([createdComment, ...this.comments()]);
  //     });
  // }

  // commentTrackBy(_index: number, comment: Comment) {
  //   return { _index, comment };
  // }
}
