import { Component, OnInit } from '@angular/core';
import { Subreddit } from 'src/app/model/subreddit.model';
import { SubredditService } from '../../service/subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits: Array<Subreddit> = [];

  constructor(private _subredditService : SubredditService) { }

  ngOnInit(): void {

    this._subredditService.getAllSubreddits()
      .subscribe(data=>{
        this.subreddits = data;
      }, error=>{
          console.error(error);
      });
  }

}
