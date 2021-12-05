import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subreddit } from 'src/app/model/subreddit.model';
import { CreatePost } from './create-post.payload';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { SubredditService } from '../../service/subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;

  postPayload: CreatePost;

  subreddits!: Array<Subreddit>;
  

  constructor(private router:Router,
              private _postService: PostService,
              private _subredditService: SubredditService) { 
        this.postPayload = {
          postName: '',
          subredditName: '',
          url: '',
          description: ''
        }
        this.createPostForm = new FormGroup({
            postName: new FormControl('',Validators.required),
            subredditName: new FormControl('', Validators.required),
            url: new FormControl('', Validators.required),
            description: new FormControl('',Validators.required) 
        });            
  }

  ngOnInit() {
    this._subredditService.getAllSubreddits()
      .subscribe(subreddits=>{
        this.subreddits = subreddits;
      }, error=>{
        throwError(error);
      });
  }

  createPost() {
      this.postPayload.postName = this.createPostForm.get('postName')?.value;
      this.postPayload.subredditName = this.createPostForm.get('subredditName')?.value;
      this.postPayload.url = this.createPostForm.get('url')?.value;
      this.postPayload.description = this.createPostForm.get('description')?.value;

      this._postService.createPost(this.postPayload)
        .subscribe((data:any)=>{
          this.router.navigateByUrl('/');      
        });
    }

  discardPost() {
      this.router.navigate(['']);
  }

}
