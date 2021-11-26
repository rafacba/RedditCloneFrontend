import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { LoginRequestPayload } from './login-request.payload';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isError: boolean;
  loginRequestPayload:LoginRequestPayload;

  constructor(private _auth:AuthService) {

    this.loginRequestPayload = {
      username:'',
      password:''
    };
    this.isError= false;
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required)
    });
   }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.invalid) {return};
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;
    this._auth.login(this.loginRequestPayload)
      .subscribe(()=> console.log('LoginSuccessful'));
  }

}
