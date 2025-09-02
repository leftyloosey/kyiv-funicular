import {
  afterEveryRender,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../../shared/components/comment/comment';
import { CommentService } from '../../services/comment-service/comment.service';
import { Comment } from '../../utils/interfaces/comment';
import { CommentFormComponent } from '../../shared/components/comment-form/comment-form';
import { Observable, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnDestroy, AfterViewInit {
  private commentService = inject(CommentService);
  private route = inject(ActivatedRoute);
  private routeData$: Observable<any> = this.route.data;
  protected comments = signal<Comment[]>([]);

  protected scrollWidth = signal<number>(0);
  protected oldWidth = signal<number>(0);

  protected displayComments = signal<Comment[]>([]);
  protected commentContainer = viewChild<ElementRef>('commentContainer');

  private commentsList$ = this.routeData$.subscribe(
    (response: { [key: string]: Comment[] }) => {
      const comments = response['comment'] || [];
      this.displayComments.set(comments);
    }
  );

  constructor() {
    // afterEveryRender(() => {
    setTimeout(() => {
      if (this.scrollWidth() === this.oldWidth()) {
        this.commentContainer()?.nativeElement.scrollTo({
          left: this.scrollWidth(),
          behavior: 'smooth',
        });
        this.oldWidth.set(0);
      }
    }, 1000);

    // });

    this.commentService.newComment
      .pipe(takeUntilDestroyed())
      .subscribe((com) => {
        this.commentService.createCommentOnBackend(com).subscribe((comment) => {
          if (!comment.parentId) {
            this.displayComments.update((prev) => [...prev, comment]);
            this.oldWidth.set(this.scrollWidth());
          } else {
            this.commentService.getCommentsFromService(comment);
          }
        });
      });
  }

  ngAfterViewInit(): void {
    this.scrollWidth.set(this.commentContainer()?.nativeElement.scrollWidth);
    this.commentContainer()?.nativeElement.scrollTo({
      left: this.scrollWidth(),
      behavior: 'smooth',
    });
    this.oldWidth.set(this.scrollWidth());
  }

  ngOnDestroy(): void {
    this.commentsList$.unsubscribe();
  }
}
