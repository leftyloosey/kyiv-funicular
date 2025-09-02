import {
  Component,
  inject,
  signal,
  OnDestroy,
  viewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../utils/interfaces/comment';
import { CommentComponent } from '../../shared/components/comment/comment';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { CommentService } from '../../services/comment-service/comment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, CommentComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnDestroy {
  protected displayComments = signal<Comment[]>([]);
  private comt = inject(CommentService);
  private route = inject(ActivatedRoute);
  private routeData$: Observable<any> = this.route.data;

  private commentsList$ = this.routeData$
    .pipe(takeUntilDestroyed())
    .subscribe((response: { [key: string]: Comment[] }) => {
      const comments = response['comment'] || [];
      this.displayComments.set(comments);
    });

  constructor() {
    this.routeData$ = this.route.data;
    this.comt.deleteCommentSubject$
      .pipe(takeUntilDestroyed())
      .subscribe((comment) => {
        this.comt.deleteCommentOnBackend(comment).subscribe(); //todo
        this.displayComments.set(
          this.displayComments().filter((item) => item.id !== comment)
        );
      });
  }

  public ngOnDestroy(): void {
    this.commentsList$.unsubscribe();
  }
}
