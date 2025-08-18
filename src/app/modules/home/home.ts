import {
  afterEveryRender,
  afterNextRender,
  AfterViewChecked,
  AfterViewInit,
  Component,
  computed,
  effect,
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
import { distinct, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { scrollSignal } from '../../utils/signals';
@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent
  implements OnDestroy, AfterViewInit, AfterViewChecked
{
  private commentService = inject(CommentService);
  private route = inject(ActivatedRoute);
  private routeData$: Observable<any> = this.route.data;
  protected comments = signal<Comment[]>([]);
  protected displayComments = signal<Comment[]>([]);
  protected scrollWidth = signal<number>(0);
  protected scroller = computed(() => scrollSignal());

  grb = viewChild<ElementRef>('grb');

  private commentsList$ = this.routeData$.subscribe(
    (response: { [key: string]: Comment[] }) => {
      const comments = response['comment'] || [];
      this.displayComments.set(comments);
    }
  );

  constructor() {
    afterNextRender(() => {
      this.grb()?.nativeElement.scrollTo({
        left: this.scrollWidth(),
        behavior: 'smooth',
      });
    });
  }
  ngAfterViewChecked(): void {
    this.scrollWidth.set(this.grb()?.nativeElement.scrollWidth);
    scrollSignal.set(true);
  }

  ngAfterViewInit(): void {
    this.scrollWidth.set(this.grb()?.nativeElement.scrollWidth);
    this.commentService.createCommentSubject$
      .pipe(
        // take(1),
        distinct(),
        map((com) => {
          this.commentService
            .createComment(com)
            .pipe(
              // take(1),
              distinct()
            )

            .subscribe((comment) => {
              if (!comment.parentId) {
                this.displayComments.update((prev) => [...prev, comment]);
                this.scrollWidth.set(this.grb()?.nativeElement.scrollWidth);
              } else {
              }
            });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.commentsList$.unsubscribe();
  }
}
