import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface cuisine {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-rest-on-board',
  templateUrl: './rest-on-board.component.html',
  styleUrls: ['./rest-on-board.component.scss']
})

export class RestOnBoardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  cuisines: cuisine[] = [
    {value: 'veg-3', viewValue: 'Veg Restaurents'},
    {value: 'non-veg-4', viewValue: 'Non-Veg Restaurents'},
    {value: 'indian-0', viewValue: 'Indian'},
    {value: 'thai-1', viewValue: 'Thai'},
    {value: 'british-2', viewValue: 'British'},
  ];
}
