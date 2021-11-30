import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input()
  post!: Post;
  faArrowUp: any;
  faArrowDown: any;

  constructor() { }

  ngOnInit(): void {
  }

  upvotePost() {

  }

  downvotePost() {

  }

}
