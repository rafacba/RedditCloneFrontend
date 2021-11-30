import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input()
  data!: Array<Post>;

  faComments: any;

  constructor() { }

  ngOnInit(): void {
  }

  goToPost(postId:number) {
    console.log(postId);
  }

}
