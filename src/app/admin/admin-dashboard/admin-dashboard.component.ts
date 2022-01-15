import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  Reviews: number;
}
export interface PeriodicElementuser {
  userName: string;
  no: number;
  email: string;
  password: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', Reviews: 1},
  {position: 2, name: 'Helium', Reviews: 4},
  {position: 3, name: 'Lithium', Reviews: 6},
  {position: 4, name: 'Beryllium', Reviews: 9},
  {position: 5, name: 'Boron', Reviews: 10},
  {position: 6, name: 'Carbon', Reviews: 12},
  {position: 7, name: 'Nitrogen', Reviews: 1},
  {position: 8, name: 'Oxygen', Reviews: 1},
  {position: 9, name: 'Fluorine', Reviews: 3},
  {position: 10, name: 'Neon', Reviews: 20},
];
const ELEMENT_DATA_User: PeriodicElementuser[] = [
  {no: 1, email: 'kiran@gmail.com', userName: 'kiran Nikam', password: 'kiran'},
  {no: 1, email: 'kiran@gmail.com', userName: 'kiran Nikam', password: 'kiran'},
  {no: 1, email: 'kiran@gmail.com', userName: 'kiran Nikam', password: 'kiran'},
  {no: 1, email: 'kiran@gmail.com', userName: 'kiran Nikam', password: 'kiran'},
];
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'Reviews'];
  displayedColumnsUsers: string[] = ['no', 'email', 'userName', 'password'];
  dataSource = ELEMENT_DATA;
  dataSourceUser = ELEMENT_DATA_User;

  adminId: any = localStorage.getItem("adminId")
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!this.adminId) {
      this.router.navigate(["/" , "admin"])
    }
  }

}
