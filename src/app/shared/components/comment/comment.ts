import { Component, inject, input, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../utils/interfaces/comment';
import { CommentService } from '../../../services/comment-service/comment.service';
import { ReplyComment } from '../reply-comment/reply-comment';
import { Comment2 } from '../comment2/comment2';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { inputSafetyStorage } from '../../../utils/signals';
@Component({
  selector: 'app-comment',
  imports: [CommonModule, Comment2, ReplyComment],
  templateUrl: './comment.html',
  styleUrls: ['./comment.scss'],
})
export class CommentComponent implements OnDestroy {
  private commentService = inject(CommentService);
  protected commentId: string = '';
  protected upper: boolean = false;
  protected lower: boolean = true;

  public nestedComments = signal<Comment[]>([]);
  public comment = input.required<Comment>();
  public isProfileComment = input.required<boolean>();
  public hasClickedReply: boolean = false;

  private newKOM$ = this.commentService.getKomment;
  protected comments$ = toObservable(this.comment);
  private kommentSubscription: Subscription;

  constructor() {
    this.kommentSubscription = this.newKOM$.subscribe((newComment) => {
      const parentOfNew = newComment.parentId || null;
      const currentId = this.comment().id || null;

      if (parentOfNew == currentId) this.setNestedComments();
    });
  }
  ngOnDestroy(): void {
    this.kommentSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setNestedComments();
  }

  private setNestedComments() {
    this.commentService
      .getCommentsFromBackend(this.comment().id)
      .subscribe((comment) => {
        this.nestedComments.set([...comment]);
      });
  }

  protected mouseUpperTrue() {
    if (this.hasClickedReply == true) this.upper = true;
  }
  protected mouseLowerTrue() {
    if (this.hasClickedReply == true) this.lower = true;
  }
  protected mouseLowerFalse() {
    this.lower = false;
  }
  protected mouseUpperFalse() {
    this.upper = false;
  }
  protected toggleClickButtonOnly() {
    inputSafetyStorage.set('');
    this.hasClickedReply = !this.hasClickedReply;
  }
  protected toggleRepliesVisible(): boolean {
    if (this.hasClickedReply == true && (this.upper || this.lower)) {
      return true;
    } else {
      return false;
    }
  }

  protected deleteComment(id: string) {
    this.commentService.deleteCommentSubject$.next(id);
  }
}
