import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostTileComponent implements OnInit {

  @Input()
  data!: Array<Post>;

  faComments: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToPost(postId:number) {
    this.router.navigate(['view-post',postId])
  }

}
