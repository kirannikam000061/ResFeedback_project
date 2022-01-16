import { Component, OnInit,HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { cuisines } from '../config'
import { APIService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public searchResults :boolean = false;
  public isShow:boolean = false;
  topPosToStartShowing = 100;
  userId: any = localStorage.getItem("userId")
  userDetails: any = localStorage.getItem("userDetails")
  
  foods: any[] = cuisines
  restoList: any[] = []
  britishRestoList: any[] = []
  indianRestoList: any[] = []
  thaiRestoList: any[] = []
  allRestoList: any[] = []
  foodType: string = ""
  cuisineType: string = ""
  
  customOptions: OwlOptions = {
    loop: true,
    autoplayHoverPause : true,
    autoplay:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(private router: Router,public dialog: MatDialog, private api: APIService) { }


  ngOnInit(): void {
    if(this.userDetails && typeof(this.userDetails) == "string") {
      this.userDetails = JSON.parse(this.userDetails)
    }
    this.getResto()
  }


  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log('[scroll]', scrollPosition);
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  //function to select cuisine
  selectCuisine(cuisine: string) {
    if(this.cuisineType == cuisine) {
      this.searchResults = false
      this.cuisineType = ""
    } else {
      this.searchResults = true
      this.cuisineType = cuisine
    }
    this.restoList = JSON.parse(JSON.stringify(this.allRestoList))
    this.restoList = this.restoList.filter((o) => o.cuisine == cuisine)
  }

  //function to get list of resto
  getResto() {
    let reqParams = { query: {} }
    this.api.apiRequest('post', "resto/list", reqParams).subscribe(result => {
      console.log("result", result)
      if(result.status == "success") {
        this.restoList = result.data.restoList
        this.allRestoList = result.data.restoList
        this.britishRestoList = result.data.restoList.filter((o:any) => o.cuisine == "british-2")
        this.indianRestoList = result.data.restoList.filter((o:any) => o.cuisine == "indian-0")
        this.thaiRestoList = result.data.restoList.filter((o:any) => o.cuisine == "thai-1")
      } else {
        alert("Could not fetch resto values!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
  }

  //function to filter records
  filterRecords() {
    this.searchResults = true
    this.cuisineType = ""
    this.restoList = JSON.parse(JSON.stringify(this.allRestoList))
    this.restoList = this.restoList.filter((o) => o.cuisine == this.foodType)
  }

}
