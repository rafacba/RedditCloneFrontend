import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subreddit } from '../../model/subreddit.model';
import { Router } from '@angular/router';
import { SubredditService } from '../../service/subreddit.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm : FormGroup;
  subredditModel: Subreddit;
  title = new FormControl('');
  description= new FormControl('');

  constructor(private router: Router,
              private _subredditService:SubredditService) { 
      this.createSubredditForm= new FormGroup({
        title: new FormControl('',Validators.required),
        description: new FormControl('',Validators.required) 
      });
      this.subredditModel = {
        name: '',
        description: ''
      }
  }

  ngOnInit(): void {
  }

  discard() {
    this.router.navigate(['']);
  }

  createSubreddit(){
    this.subredditModel.name =  this.createSubredditForm.get('title')?.value;
    this.subredditModel.description = this.createSubredditForm.get('description')?.value;
    console.log(this.subredditModel);
    this._subredditService.createSubreddit(this.subredditModel)
      .subscribe(data=>{
        this.router.navigate(['list-subreddits'])
      }, error => {
        console.log('Error ocurred');
      })
  }

}
