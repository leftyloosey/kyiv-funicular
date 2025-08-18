import {
  afterNextRender,
  AfterViewInit,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../utils/interfaces/comment';
import { CommentService } from '../../../services/comment-service/comment.service';
import { ReplyComment } from '../reply-comment/reply-comment';
import { nestedSignal } from '../../../utils/signals';
@Component({
  selector: 'app-comment',
  imports: [CommonModule, ReplyComment],
  templateUrl: './comment.html',
  styleUrls: ['./comment.scss'],
})
export class CommentComponent implements AfterViewInit {
  private commentService = inject(CommentService);
  public nestedComments = signal<Comment[]>([]);
  public comment = input.required<Comment>();
  public isProfileComment = input.required<boolean>();
  protected commentId: string = '';
  public hasClickedReply: boolean = false;
  third: boolean = false;
  canClickReply: boolean = true;
  replySize = signal<boolean>(false);

  constructor() {
    this.commentService.castValue.subscribe(
      (value) => (this.canClickReply = value)
    );
    effect(() => {
      if (!nestedSignal()) this.nestedComments.update(() => []);
    });
  }
  ngAfterViewInit(): void {
    nestedSignal.set(true);
    this.setNestedComments();
  }

  ngOnInit(): void {
    this.commentId = this.comment().id;
  }

  public setNestedComments() {
    this.commentService.getComments(this.comment().id).subscribe({
      next: (comments) => this.nestedComments.set(comments),
      complete: () => {
        this.third = true;
      },
    });
    nestedSignal.set(true);
  }

  public clickReply() {
    if (this.hasClickedReply) {
      this.changeCanReply(true);
      this.hasClickedReply = !this.hasClickedReply;
      this.third = false;
      return;
    }
    this.hasClickedReply = !this.hasClickedReply;

    this.changeCanReply(false);

    this.setNestedComments();
  }
  protected clickDelete(id: string) {
    this.commentService.testSubject$.next(id);
  }
  protected changeCanReply(value: boolean) {
    this.commentService.sendValue(value);
  }
}
