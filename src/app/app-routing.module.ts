import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
