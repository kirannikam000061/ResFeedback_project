import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-feedback-model',
  templateUrl: './feedback-model.component.html',
  styleUrls: ['./feedback-model.component.scss']
})
export class FeedbackModelComponent{

  constructor(
    public dialogRef: MatDialogRef<FeedbackModelComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
