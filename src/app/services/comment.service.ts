// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommentService {

// }

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
  // http = inject(HttpClient);
  // commentService: CommentService = inject(CommentService);
  // getComments(parentId: string = '') {
  //   let url = `${environment.apiBaseUrl}/comments/top`;

  //   return this.http.get<Comment[]>(url);
  // }
  // getComments(parentId: string = '') {
  //   let url = `${environment.apiBaseUrl}/comments`;
  //   if (parentId) {
  //     url += `?parentId=${parentId}`;
  //   }
  //   return this.http.get<Comment[]>(url);
  // }

  // createComment(comment: CreateCommentDto) {
  //   return this.http.post<Comment>(
  //     `${environment.apiBaseUrl}/comments`,
  //     comment
  //   );
  // }
  url = 'https://nestor-b7eb2f7c8808.herokuapp.com/comments/top';
  // url = 'http://localhost:3000/comments/top';

  async getAllComments(): Promise<Comment[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  // async getAllComments(): Promise<Comment[]> {
  //   const data = await fetch(this.url);
  //   return (await data.json()) ?? [];
  // }
}
