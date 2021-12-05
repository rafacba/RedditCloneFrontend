import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Comment} from '../model/comment.payload'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

      
  url:string = environment.URL;

  constructor(private http: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}comments/by-post/${postId}`);
  }

  postComment(comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.url}comments/`, comment);
  }

  getAllCommentsByUser(name: string) {
    return this.http.get<Comment[]>('http://localhost:8080/api/comments/by-user/' + name);
  }
}
