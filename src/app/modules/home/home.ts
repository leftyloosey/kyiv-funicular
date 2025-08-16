import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../../shared/components/comment/comment';
// import { CommentService } from '../../services/comment/comment.service';
import { Comment } from '../../utils/interfaces/comment';
import { CommentFormComponent } from '../../shared/components/comment-form/comment-form';
// import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnDestroy {
  // private commentService = inject(CommentService);
  // private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  // private testSubject$ = new Subject<string>();
  private routeData$: Observable<any> = this.route.data;
  protected comments = signal<Comment[]>([]);
  protected displayComments = signal<Comment[]>([]);

  private commentsList$ = this.routeData$.subscribe(
    (response: { [key: string]: Comment[] }) => {
      const comments = response['comment'] || [];
      this.displayComments.set(comments);
    }
  );

  ngOnDestroy(): void {
    this.commentsList$.unsubscribe();
  }
}
