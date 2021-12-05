import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/comment.payload';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  
  postId: number;
  post!: Post;
  commentForm!: FormGroup;
  comments!: Comment[];
  comment!: Comment;


  constructor(private _postService : PostService,
              private activatedRoute: ActivatedRoute,
              private _commentService: CommentService,
              private router:Router) {
        this. postId = this.activatedRoute.snapshot.params.id;
        this.commentForm = new FormGroup( {
            text: new FormControl('',Validators.required)
        });
        this.comment = {
          text: '',
          postId: this.postId
        }
      }
      
      ngOnInit(): void {
        this.getPostById();
        this.getCommentsForPost();
      }
      
      postComment() {
        
      }

      getPostById() {
        this._postService.getPost(this.postId)
          .subscribe(data=>{
            //console.log(data);
            this.post=data;
            //console.log(this.post);
          });
      }

      getCommentsForPost() {
         this._commentService.getAllCommentsForPost(this.postId)
           .subscribe(data=>{
             this.comments = data;
           }) 
      }

      
}
