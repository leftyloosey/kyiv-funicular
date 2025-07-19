// import { Observable, of, ReplaySubject } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '../interfaces/comment';
import { environment } from '../../environments/environments';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  getComments(parentId: string = '') {
    // let url = `http://localhost:3000/comments/top`;
    let url = `${environment.apiBaseUrl}/comments/awl`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }

  createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(
      `${environment.apiBaseUrl}/comments`,
      comment
    );
    // .subscribe((data) => {
    //   console.log('data:', data);
    // });
  }
}
