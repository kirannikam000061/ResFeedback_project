import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { APIService } from '../../api.service';
import { cuisines } from 'src/app/config';

@Component({
  selector: 'app-rest-on-board',
  templateUrl: './rest-on-board.component.html',
  styleUrls: ['./rest-on-board.component.scss']
})

export class RestOnBoardComponent implements OnInit {

  constructor(private router: Router, private api: APIService) { }

  adminId: any = localStorage.getItem("adminId")
  cuisines: any[] = cuisines

  restoForm: FormGroup = new FormGroup({
    name : new FormControl(null,[Validators.required]),
    cost2 : new FormControl(null,[Validators.required]),
    location : new FormControl(null,[Validators.required]),
    cuisine : new FormControl(null,[Validators.required]),
    restoPic : new FormControl(null,),
    veg1 : new FormControl(null,[Validators.required]),
    veg2 : new FormControl(null,[Validators.required]),
    veg3 : new FormControl(null,[Validators.required]),
    nonveg1 : new FormControl(null,[Validators.required]),
    nonveg2 : new FormControl(null,[Validators.required]),
    nonveg3 : new FormControl(null,[Validators.required]),
  })

  ngOnInit(): void {
    if(!this.adminId) {
      this.router.navigate(["/" , "admin"])
    }
  }

  //function to save resto data 
  saveResto() {
    let fd = new FormData()
    let reqParams:any = this.restoForm.value
    const keys = Object.keys(reqParams)
    keys.map((key) => {
      fd.append(key, reqParams[key])
    })
    const restoPicEl:any = document.getElementById("restoPic") as HTMLInputElement
    console.log("restoPicEl.files", restoPicEl.files)
    fd.append("restoPic", restoPicEl.files[0])
    console.log("fd", fd)
    
    this.api.apiRequest('post', "resto/onboard", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        // this.router.navigate(['/', 'admin', 'dashboard'])
      } else {
        alert("Please enter correct values!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
  }

}
