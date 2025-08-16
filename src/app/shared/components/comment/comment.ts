import {
  AfterViewInit,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../utils/interfaces/comment';
import { CommentService } from '../../../services/comment-service/comment.service';
import { ReplyComment } from '../reply-comment/reply-comment';
import { CommentFormComponent } from '../comment-form/comment-form';
import { take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, ReplyComment],
  templateUrl: './comment.html',
  styleUrls: ['./comment.scss'],
})
export class CommentComponent implements AfterViewInit {
  comment = input.required<Comment>();
  isProfileComment = input.required<boolean>();
  commentId: string = '';
  // commentId = signal<string>(this.comment().id);
  hasClickedReply: boolean = false;
  third: boolean = false;

  canClickReply: boolean = true;
  replySize = signal<boolean>(false);
  // third = signal<boolean>(false);

  commentService = inject(CommentService);
  nestedComments = signal<Comment[]>([]);

  constructor() {
    this.commentService.castValue.subscribe(
      (value) => (this.canClickReply = value)
    );
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.commentId = this.comment().id;
  }
  // public returnID = (): string => {
  //   return this.commentId;
  // };
  private setComments() {
    this.commentService
      .getComments(this.comment().id)
      // .pipe(take(1))
      // .pipe(takeWhile(() => this.hasClickedReply))
      .subscribe({
        next: (comments) => this.nestedComments.set(comments),
        complete: () => {
          this.third = true;
        },
      });
  }
  // private setComments() {
  //   this.commentService.getComments(this.comment().id).subscribe((comments) => {
  //     this.nestedComments.set(comments);
  //   });
  // }

  protected clickReply() {
    if (this.hasClickedReply) {
      this.changeCanReply(true);
      this.hasClickedReply = !this.hasClickedReply;
      this.third = false;
      return;
    }
    this.hasClickedReply = !this.hasClickedReply;

    this.changeCanReply(false);

    this.setComments();
  }
  protected clickDelete(id: string) {
    console.log('comment', id);
    this.commentService.testSubject$.next(id);
  }
  protected changeCanReply(value: boolean) {
    this.commentService.sendValue(value);
  }
}
