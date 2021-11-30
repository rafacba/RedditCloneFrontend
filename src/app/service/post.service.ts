import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { environment } from '../../environments/environment';
import { CreatePost } from '../pages/create-post/create-post.payload';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  url:string = environment.URL;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.url}posts/`);
  }

  createPost(postPayload: CreatePost): Observable<any> {
    return this.http.post(`${this.url}posts`, postPayload);
  }
}
