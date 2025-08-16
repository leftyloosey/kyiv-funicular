import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '../../utils/interfaces/comment';
import { environment } from '../../environments/environments';
import { BehaviorSubject, Subject } from 'rxjs';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  user: string;
};
// type DeleteCommentDto = {
//   commentId: string;
// };

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);
  public testSubject$ = new Subject<string>();
  private booleanValue = new Subject<boolean>();
  castValue = this.booleanValue.asObservable();

  sendValue(newValue: boolean) {
    console.log(newValue);
    this.booleanValue.next(newValue);
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
    console.log(commentId);
    console.log(`${environment.apiBaseUrl}/comments/delete/${commentId}`);
    return this.http
      .delete<Comment>(`${environment.apiBaseUrl}/comments/delete/${commentId}`)
      .subscribe(() => console.log(`${commentId} deleted`));
  }
}
