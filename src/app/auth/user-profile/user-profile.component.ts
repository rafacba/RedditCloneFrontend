import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post.service';
import { CommentService } from 'src/app/service/comment.service';
import {Comment} from '../../model/comment.payload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name!:string;
  posts!: Post[];
  comments!: Comment[];
  postLength!: number;
  commentLength!: number;
  

  constructor(private acitvatedRoute: ActivatedRoute,
              private _postService:PostService,
              private _commentService: CommentService) { 
                this.name = this.acitvatedRoute.snapshot.params.name;

                this._postService.getAllPostsByUser(this.name)
                  .subscribe(data=>{
                    console.log(data);
                    this.posts =  data;
                    this.postLength = data.length;
                  });
                this._commentService.getAllCommentsByUser(this.name)
                  .subscribe(data=>{
                    this.comments=data;
                    this.commentLength=data.length;
                  });
              }

  ngOnInit(): void {
  }

}
