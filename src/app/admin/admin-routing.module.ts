import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { RestOnBoardComponent } from './rest-on-board/rest-on-board.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLoginComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'admin/adminReview',
    component: AdminReviewComponent,
  },
  {
    path: 'admin/restOnboarding',
    component: RestOnBoardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
