import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.email,Validators.required]),
    password : new FormControl(null,[Validators.required])
  })
  constructor( private _router:Router, private _userService: UserService
  ) {}
  ngOnInit(): void {
  }
  loginform(){
    if(!this.loginForm.valid){
      console.log('Invalid');
      this._router.navigate(['/']);
      
    }
    console.log(JSON.stringify(this.loginForm.value));
    
  }
  
}