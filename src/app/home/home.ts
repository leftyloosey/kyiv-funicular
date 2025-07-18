import { Component, inject, signal } from '@angular/core';
import { Comment } from '../components/comment/comment';
import { CommentService } from '../services/comment.service';
// import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  imports: [Comment],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  // userService = inject(UserService);
  ngOnInit(): void {
    this.getAllComments();
  }

  getAllComments() {
    this.commentService.getAllComments().then((data) => console.log(data));
  }
  // getComments() {
  //   this.commentService.getComments().subscribe((comments) => {
  //     this.comments.set(comments);
  //     console.log(comments);
  //   });
  // }
}
