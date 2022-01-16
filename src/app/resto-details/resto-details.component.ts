import { Component, OnInit } from '@angular/core';
import { FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { FeedbackModelComponent } from '../feedback-model/feedback-model.component';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../api.service';

// import { StarRatingComponent } from 'ng-starrating';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Menu',
    children: [
      {
        name: 'Veg',
        children: [{name: 'Aloo tikka'}, {name: 'Bhendi ki bhaji'}, {name: 'Kofte'}, {name: 'Palak panner'}],
      },
      {
        name: 'Non-veg',
        children: [{name: 'Chicken tikka massala'},
         {name: 'Chicken Kemaa masala '},
         {name: 'Butter chicken '},
         {name: 'Chicken egg Kemaa masala '}
        ],
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-resto-details',
  templateUrl: './resto-details.component.html',
  styleUrls: ['./resto-details.component.scss']
})
export class RestoDetailsComponent implements OnInit {
  userId: any = localStorage.getItem("userId")
  userDetails: any = localStorage.getItem("userDetails")
  alreadyReviewed: boolean = false
  
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  restoId: string = ""
  resto: any = {}
  reviews: any[] = []

  constructor(private router: Router, public dialog: MatDialog, private api: APIService) { 
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable

  ngOnInit(): void {
    if(this.userDetails && typeof(this.userDetails) == "string") {
      this.userDetails = JSON.parse(this.userDetails)
    }
    const locArray = location.href.split("/")
    this.restoId = locArray[locArray.length - 1]
    if(location.href.indexOf("feedback") > -1) {
      const idArray = this.restoId.split("?")
      this.restoId = idArray[0]
      this.openDialogFeedback()
    }
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
            if(o.reviewById == this.userId) {
              this.alreadyReviewed = true
            }
            o.width = o.rating * 20 + "%"
          })

        }
        this.dataSource.data = [
          {
            name: 'Menu',
            children: [
              {
                name: 'Veg',
                children: [{ name: this.resto.veg1 }, { name: this.resto.veg2 }, { name: this.resto.veg3 }],
              },
              {
                name: 'Non-veg',
                children: [{ name: this.resto.nonveg1 }, { name: this.resto.nonveg2 }, { name: this.resto.nonveg3 }],
              }
            ]
          }
        ]
      } else {
        alert("Could not fetch restaurant details!")
      }
    }, (err) => {
      console.log("err ==> ", err)
      alert("Something went wrong!")
    })
  }

  // funciton to open feedback dialog
  openDialogFeedback(): void {
    const dialogRef = this.dialog.open(FeedbackModelComponent, {
      maxWidth: '400px',
      data: { restoId: this.restoId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result)
      result.review.width = result.review.rating * 20 + '%'
      this.reviews.push(result.review)
      console.log('The dialog was closed');
    })
  }

  
}
