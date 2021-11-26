import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  signupRequestPayload:SignupRequestPayload;

  constructor(private _auth: AuthService) { 
    this.signupRequestPayload= {
      username:'',
      password:'',
      email:''
    }
    this.signupForm = new FormGroup({
        username: new FormControl('',Validators.required),
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',Validators.required)
    });
  }

  ngOnInit(): void {

  }

  signup() {

    if(this.signupForm.invalid) {
      return;
    }
    this.signupRequestPayload.email = this.signupForm.value.email;
    this.signupRequestPayload.username = this.signupForm.value.username;
    this.signupRequestPayload.password = this.signupForm.value.password;
    
    this._auth.signup(this.signupRequestPayload)
      .subscribe((resp)=>{
          console.log(resp);
      });

  }
}
