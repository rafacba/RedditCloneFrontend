import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { LoginRequestPayload } from './login-request.payload';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isError: boolean=false;
  loginRequestPayload:LoginRequestPayload;
  registerSuccessMessage: string ='';

  constructor(private _auth:AuthService,
              private _toastr: ToastrService,
              private router:Router,
              private activatedRoute: ActivatedRoute) {

    this.loginRequestPayload = {
      username:'',
      password:''
    };

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required)
    });
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params=>{
          if(params.registered !== undefined && params.registered ==='true') {
            this._toastr.success('Signup Successful');
            this.registerSuccessMessage = 'Please check your inbox to activate your account before you login';
          }
      });
  }

  login() {
    if (this.loginForm.invalid) {return};
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;
    this._auth.login(this.loginRequestPayload)
      .subscribe({
        next: ()=> {
          this.isError = false;
          this.router.navigateByUrl('').then(()=>{
            window.location.reload();
          });
          this._toastr.success('Login Successful','Login Successfull');
        },
        error: ()=> this.isError=true,
      });
    }
}
