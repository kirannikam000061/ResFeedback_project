import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'Reviews']
  displayedColumnsUsers: string[] = ['no', 'fullName', 'email', 'createdAt']
  dataSource = []
  dataSourceUser = []

  adminId: any = localStorage.getItem("adminId")
  constructor(private router: Router, private api: APIService) { }

  ngOnInit(): void {
    if(!this.adminId) {
      this.router.navigate(["/" , "admin"])
    }
    this.getResto()
    this.getUsers()
  }

  //function to get list of resto
  getResto() {
    let reqParams = { query: {} }
    this.api.apiRequest('post', "resto/list", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        this.dataSource = result.data.restoList
      } else {
        alert("Could not fetch resto values!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
  }

  //function to get list of users
  getUsers() {
    let reqParams = { query: { userType: "User"} }
    this.api.apiRequest('post', "users/list", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        this.dataSourceUser = result.data.userList
      } else {
        alert("Could not fetch user list!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
  }

}
