import { Component, OnInit } from '@angular/core';
import { Subreddit } from 'src/app/model/subreddit.model';
import { SubredditService } from 'src/app/service/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  displayViewAll: boolean= false;
  subreddits: Array<Subreddit>=[];

  constructor(private _subredditService:SubredditService) { }

  ngOnInit(): void {
    this._subredditService.getAllSubreddits()
      .subscribe(data=>{
        if(data.length>=4) {
          this.subreddits=data.splice(0,3);
          this.displayViewAll = true;
        } else {
          this.subreddits=data;
        }
      })
  }

}
