import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../components/comment/comment';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment';
import { CommentFormComponent } from '../components/comment-form/comment-form';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
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
    const autoRefreshRate = 1000;
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text,
      userId: user._id,
    });
    // .subscribe((createdComment) => {
    //   this.comments.set([createdComment, ...this.comments()]);
    // });
  }

  commentTrackBy(_index: number, comment: Comment) {
    return comment._id;
  }
}

// import { Component, inject, signal } from '@angular/core';
// import { Comment } from '../components/comment/comment';
// import { CommentService } from '../services/comment.service';
// import { UserService } from '../services/user.service';

// @Component({
//   selector: 'app-home',
//   imports: [Comment],
//   templateUrl: './home.html',
//   styleUrl: './home.scss',
// })
// export class Home {
//   commentService = inject(CommentService);
//   comments = signal<Comment[]>([]);
//   userService = inject(UserService);
//   ngOnInit(): void {
//     this.getAllComments();
//   }

//   getAllComments() {
//     this.commentService.getAllComments().then((data) => console.log(data));
//   }

// }
