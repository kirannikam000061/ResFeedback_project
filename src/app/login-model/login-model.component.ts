import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-login-model',
  templateUrl: './login-model.component.html',
  styleUrls: ['./login-model.component.scss']
})
export class LoginModelComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginModelComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
