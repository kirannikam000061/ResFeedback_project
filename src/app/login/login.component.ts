import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { APIService } from '../api.service';

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
  restoId: string = ""
  constructor( private _router:Router, private _userService: UserService,
    private api: APIService ) {}

  ngOnInit(): void {
    const url = location.href
    if(url.indexOf("return")) {
      const locArray1 = url.split("/")
      const locArray2 = locArray1[locArray1.length - 1].split("=")
      this.restoId = locArray2[locArray2.length - 1]
      console.log("this.restoId", this.restoId)
    }
  }

  //function to complete login
  loginform(){
    if(!this.loginForm.valid ) {
      console.log('Invalid form')
      return
    }

    let reqParams = this.loginForm.value
    reqParams.userType = "User"
    this.api.apiRequest('post', "users/signin", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        const user = result.data.userDetails
        localStorage.setItem("userId", user._id)
        localStorage.setItem("userDetails", JSON.stringify(user))
        if(this.restoId) {
          this._router.navigate(['/', 'details', this.restoId], {queryParams: { feedback: true }})
        } else {
          this._router.navigate(['/'])
        }
      } else {
        alert("Please enter correct credentials!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
    
  }
  
}