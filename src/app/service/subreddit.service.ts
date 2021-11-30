import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subreddit } from '../model/subreddit.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  
  url:string = environment.URL;
  
  constructor(private http: HttpClient) { }
  
  getAllSubreddits(): Observable<Array<Subreddit>> {
    return this.http.get<Array<Subreddit>>(`${this.url}subreddit/`);
  }
  
  createSubreddit(subredditModel: Subreddit) :Observable<Subreddit> {
    return this.http.post<Subreddit>(`${this.url}subreddit`,subredditModel);
  }
  
}
