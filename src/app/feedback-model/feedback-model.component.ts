import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-feedback-model',
  templateUrl: './feedback-model.component.html',
  styleUrls: ['./feedback-model.component.scss']
})
export class FeedbackModelComponent{
  rating = 0;
  starCount = 5;
  ratingArr : boolean[] = []; // true = solid star; false = empty star

  snackBarDuration = 1500;
  response = [
    'You broke my heart!',
    'Really?',
    'We will do better next time.',
    'Glad you like it!',
    'Thank you so much!'
  ]

  constructor(
    public dialogRef: MatDialogRef<FeedbackModelComponent>, private _snackBar: MatSnackBar
  ) {
        //default to do rating, i.e. all emplty starts
        this.ratingArr  = Array(this.starCount).fill(false);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

    // star rating starts here
    returnStar(i: number){
      if (this.rating >= i + 1){
        return 'star';
      }else{
        return 'star_border';
      }
    }
  
    onClick(i: number){
      this.rating = i + 1;
      this._snackBar.open(this.response[i], '' , {
        duration: this.snackBarDuration,
        panelClass: ['snack-bar']
      });
    }
  
    // ends here
}
