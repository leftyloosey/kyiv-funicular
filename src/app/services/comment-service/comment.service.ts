import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '../../utils/interfaces/comment';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  user: string;
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  private booleanValue$ = new Subject<boolean>();
  public testSubject$ = new Subject<string>();
  public createCommentSubject$ = new Subject<CreateCommentDto>();

  castValue = this.booleanValue$.asObservable();
  newComment = this.createCommentSubject$.asObservable();

  public sendValue(newValue: boolean) {
    this.booleanValue$.next(newValue);
  }
  public nextComment(newComment: CreateCommentDto) {
    this.createCommentSubject$.next(newComment);
  }

  public getComments(parentId: string = '') {
    let url = `${environment.apiBaseUrl}/comments`;
    if (parentId.length > 0) {
      url += '/' + parentId;
    }
    return this.http.get<Comment[]>(url);
  }
  public getCommentsByUser(userId: string = '') {
    let url = `${environment.apiBaseUrl}/comments/user/${userId}`;

    return this.http.get<Comment[]>(url);
  }

  public createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(
      `${environment.apiBaseUrl}/comments`,
      comment
    );
  }
  public deleteComment(commentId: string) {
    return this.http
      .delete<Comment>(`${environment.apiBaseUrl}/comments/delete/${commentId}`)
      .subscribe(() => console.log(`${commentId} deleted`));
  }
}
