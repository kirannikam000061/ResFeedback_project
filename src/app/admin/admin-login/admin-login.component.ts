import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm:FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.email,Validators.required]),
    password : new FormControl(null,[Validators.required])
  })
  constructor( private _router:Router, private api: APIService ) {}

  ngOnInit(): void {
  }

  //function to login
  login() {
    if(!this.loginForm.valid ) {
      console.log('Invalid form')
      return
    }

    let reqParams = this.loginForm.value
    reqParams.userType = "Admin"
    this.api.apiRequest('post', "users/signin", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        const user = result.data.userDetails
        localStorage.setItem("adminId", user._id)
        // localStorage.setItem("adminDetails", JSON.stringify(user))
        this._router.navigate(['/', 'admin', 'dashboard'])
      } else {
        alert("Please enter correct credentials!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
  }

}
