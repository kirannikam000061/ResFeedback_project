import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.scss']
})
export class LoginModelComponent {
  public showSignUp:boolean = false;
  public logSignButtonName:any = 'Sign Up';
  constructor(
    public dialogRef: MatDialogRef<LoginModelComponent>,
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
}
