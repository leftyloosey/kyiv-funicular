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
import { UserService } from '../services/user.service';
import { globalSignal } from '../signals';

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
  initialCount = 18;
  // initialFormVal = 'homevalue';
  initialFormVal = signal<string>('homevalue');
  constructor() {
    effect(() => {
      console.log('Global signal value changed:', globalSignal());
    });
  }

  ngOnInit(): void {
    this.getComments();
  }
  funko(formValues: { text: string }) {
    console.log('UPPER constructor hit');
    console.log(`Upper value: ${this.initialFormVal}`);
    console.log('FUNKO', typeof this.initialFormVal);
  }
  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment(formValues: { text: string }) {
    console.log('home triggered', typeof formValues);
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    // console.log('user!', user.id);
    // if (!user) {
    //   return;
    // }
    this.commentService
      .createComment({
        text,
        user: user?.id,
        // user: '687a4bd8145a3fcf49d332c6',
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
