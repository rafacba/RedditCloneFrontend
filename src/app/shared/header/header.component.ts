import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;
  username: any;

  constructor(private router:Router,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    this.username = this._authService.getUsername();
  }

  goToUserProfile() {
      this.router.navigate(['user-profile',this.username]);
  }

  logout() {

  }

}
