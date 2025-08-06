import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '../interfaces/comment';
import { environment } from '../../environments/environments';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  user: string;
  // userId: string;
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  getComments(parentId: string = '') {
    let url = `${environment.apiBaseUrl}/comments`;
    console.log(parentId);
    if (parentId.length > 0) {
      url += '/' + parentId;
    }
    console.log(url);
    return this.http.get<Comment[]>(url);
  }
  getUserComments(userId: string = '') {
    let url = `${environment.apiBaseUrl}/comments/user/${userId}`;
    // console.log(parentId);
    // if (parentId.length > 0) {
    //   url += '/' + parentId;
    // }
    // console.log(url);
    return this.http.get<Comment[]>(url);
  }

  createComment(comment: CreateCommentDto) {
    let url = `${environment.apiBaseUrl}/comments/`;
    if (comment.parentId) {
      url += '/' + comment.parentId;
    }
    console.log('THIS IS WHERE THE COMMENT IS GOING', url);
    return this.http.post<Comment>(
      `${environment.apiBaseUrl}/comments`,
      comment
    );
  }
}
