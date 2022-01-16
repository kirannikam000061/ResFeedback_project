import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from '../api.service'

@Component({
  selector: 'app-feedback-model',
  templateUrl: './feedback-model.component.html',
  styleUrls: ['./feedback-model.component.scss']
})
export class FeedbackModelComponent implements OnInit {
  rating = 0;
  starCount = 5;
  ratingArr : boolean[] = []; // true = solid star; false = empty star
  userId: any = localStorage.getItem("userId")
  userDetails: any = localStorage.getItem("userDetails")

  snackBarDuration = 3000
  response = [
    'You broke my heart!',
    'Really?',
    'We will do better next time.',
    'Glad you like it!',
    'Thank you so much!'
  ]

  review: string = ""
 
  constructor(
    public dialogRef: MatDialogRef<FeedbackModelComponent>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: APIService) {
      this.ratingArr  = Array(this.starCount).fill(false)
  }

  ngOnInit(): void {
     if(typeof(this.userDetails) == "string") {
      this.userDetails = JSON.parse(this.userDetails)
     }
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
    // this._snackBar.open(this.response[i], '' , {
    //   duration: this.snackBarDuration,
    //   panelClass: ['snack-bar']
    // })
  }

  //function to save feedback 
  giveFeedback() {
    let reqParams = { restoId : this.data.restoId, review: this.review, rating: this.rating, 
      reviewById: this.userId, reviewByName: this.userDetails.fullName }
    console.log("reqParams", reqParams)
    this.api.apiRequest('post', "resto/addReview", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        this._snackBar.open("Thank you for your valuable feedback", 'Close' , {
          duration: this.snackBarDuration,
          panelClass: ['snack-bar']
        })
        this.dialogRef.close({
          review: reqParams
        })
      } else {
        this._snackBar.open(result.data, 'Ok' , {
          duration: this.snackBarDuration
        })
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
  }

}
