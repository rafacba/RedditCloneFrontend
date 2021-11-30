import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  post$ : Array<Post> = [];

  constructor(private _post:PostService) { 
    this._post.getAllPosts()
      .subscribe(post=>{
        this.post$ = post;
      });
   }

  ngOnInit(): void {
  }


}
