import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from '../../service/post.service';
import {Vote} from '../../model/vote.payload'
import { VoteType } from 'src/app/model/vote-type.enum';
import { VoteService } from 'src/app/service/vote.service';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input()
  post!: Post;
  votePayload: Vote;
  

  constructor(private _voteService: VoteService,
              private _auth: AuthService,
              private _postService: PostService,
              private _toastr: ToastrService) { 
                this.votePayload = {
                  voteType: VoteType.UPVOTE,
                  postId: 0
                }
              }

  ngOnInit(): void {
    console.log(this.post.id);
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this._voteService.vote(this.votePayload).subscribe(()=>{
      this.updateVoteDetails();
    }, error => {
      this._toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
      this._postService.getPost(this.post.id)
        .subscribe(post => {
            this.post = post;
        });
  }

}
