import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreManComponent } from './store-man.component';

const routes: Routes = [
  {
    path: '', component: StoreManComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreManRoutingModule { }
