import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { FormComponent } from './form_folder/form/form.component';
import { RestoDetailsComponent } from './resto-details/resto-details.component';

const routes: Routes = [
  // {
  //   path: 'form',
  //   component: FormComponent,
  // },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'details',
    component: RestoDetailsComponent,
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
