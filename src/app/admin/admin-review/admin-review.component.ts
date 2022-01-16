import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {

  constructor(private api: APIService, private _snackBar: MatSnackBar) { }
  restoId: string = ""
  resto: any = {}
  reviews: any[] = []

  ngOnInit(): void {
    const locArray = location.href.split("/")
    this.restoId = locArray[locArray.length - 1]
    this.getRestoDetails()
  }

  //function to get resto details
  getRestoDetails() {
    let reqParams = { restoId: this.restoId }
    this.api.apiRequest('post', "resto/details", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        this.resto = result.data.restoDetails
        this.reviews = this.resto.reviews
        if(this.reviews && this.reviews.length > 0) {
          this.reviews.map((o:any) => {
            o.width = o.rating * 20 + "%"
          })
        }
      } else {
        alert("Could not fetch restaurant details!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
  }

  //function to delete review
  deleteReview(reviewId: string) {
    if(confirm("Are you sure, you want to delete this review?")) {
      let reqParams = { restoId: this.restoId, reviewId }
      this.api.apiRequest('post', "resto/deleteReview", reqParams).subscribe(result => {
        console.log("result", result)
        if(result.status == "success") {
          this._snackBar.open("Successfully deleted review!", 'Close' , {
            duration: 3000,
            panelClass: ['snack-bar']
          })
          const reviewIndex = this.reviews.findIndex((o) => o._id.toString() == reviewId)
          if(reviewIndex > -1) {
            this.reviews.splice(reviewIndex, 1)
          }
        } else {
          this._snackBar.open("Could not delete review!", 'Close' , {
            duration: 3000,
            panelClass: ['snack-bar']
          })
        }
      }, (err) => {
        console.log("err ==> ", err)
        alert("Something went wrong!")
      })
    }
  }
}
