import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '../../utils/interfaces/comment';
import { environment } from '../../environments/environments';
import { Observable, shareReplay, Subject, tap } from 'rxjs';

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
  private apiUrl = `${environment.apiBaseUrl}/comments`;

  public deleteCommentSubject$ = new Subject<string>();
  public createCommentSubject$ = new Subject<CreateCommentDto>();

  // public kommentTowardFront$ = new Subject<CreateCommentDto>();
  // public kreateKommentSubject$ = new Subject<CreateCommentDto>();
  public getKommentSubject$ = new Subject<Comment>();

  public newComment = this.createCommentSubject$.asObservable();
  public getKomment = this.getKommentSubject$.asObservable();

  public submitCommentToService(newComment: CreateCommentDto) {
    this.createCommentSubject$.next(newComment);
  }
  public getCommentsFromService(getKomment: Comment) {
    this.getKommentSubject$.next(getKomment);
  }

  public getCommentsFromBackend(parentId: string = '') {
    let url = `${environment.apiBaseUrl}/comments`;
    if (parentId.length > 0) {
      url += '/' + parentId;
    }
    return this.http.get<Comment[]>(url);
  }

  public getBackendCommentsByUser(userId: string = '') {
    let url = `${environment.apiBaseUrl}/comments/user/${userId}`; //todo

    return this.http.get<Comment[]>(url);
  }

  public createCommentOnBackend(comment: CreateCommentDto) {
    return this.http.post<Comment>(
      `${environment.apiBaseUrl}/comments`, //todo
      comment
    );
    // .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  public deleteCommentOnBackend(commentId: string): Observable<Comment> {
    return this.http.delete<Comment>(
      `${environment.apiBaseUrl}/comments/delete/${commentId}`
    );
    // .pipe(tap()
    // .subscribe(() => console.log(`${commentId} deleted`)); //todo
    // subscribe in component, not here. use tap for clg
    //
  }
}
