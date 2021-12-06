import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vote } from '../model/vote.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  url: string = environment.URL;

  constructor(private http: HttpClient) { }

  vote(votePayload: Vote) {
    return this.http.post(`${this.url}votes/`, votePayload);
  }
}
