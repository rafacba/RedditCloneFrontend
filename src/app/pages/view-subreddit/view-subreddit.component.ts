import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubredditService } from '../../service/subreddit.service';
import { Subreddit } from '../../model/subreddit.model';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {

  id:number = 0;
  subreddit: Subreddit = {
    id:0,
    description:'',
    numberOfPosts:0,
    name:''
  };

  constructor(private activatedRoute: ActivatedRoute,
              private _subredditService: SubredditService) {
    this.id = this.activatedRoute.snapshot.params.id;

    this._subredditService.getSubreddit(this.id)
      .subscribe((data:any) => {
        this.subreddit = data;
        //console.log(data);
      });

   }

  ngOnInit(): void {
  }

}
