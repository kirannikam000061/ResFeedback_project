import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.scss']
})
export class LoginModelComponent {
  public showSignUp:boolean = false;
  public logSignButtonName:any = 'Sign Up';

  registerForm:FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.email,Validators.required]),
    username : new FormControl(null,[Validators.required]),
    password : new FormControl(null,[Validators.required]),
    cpass : new FormControl(null,[Validators.required])
  })
  loginForm:FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.email,Validators.required]),
    password : new FormControl(null,[Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<LoginModelComponent>, private _router:Router, private _userService: UserService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleSignUp() {
    this.showSignUp = !this.showSignUp;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.showSignUp)  
      this.logSignButtonName = "LogIn";
    else
      this.logSignButtonName = "SignUp";
  }
  loginform(){
    if(!this.loginForm.valid){
      console.log('Invalid');
      return;
    }
    console.log(JSON.stringify(this.loginForm.value));
  }
  registerButton(){
    if(!this.registerForm.valid ){
      console.log('Invalid form'); return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data=> {console.log(data); this._router.navigate(['/login']);},
      error=> console.error(error)
    )
    // console.log(JSON.stringify(this.registerForm.value));
  }
  
}
