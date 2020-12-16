import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreBoyComponent } from './store-boy.component';

const routes: Routes = [
  {
    path: '', component: StoreBoyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreBoyRoutingModule { }
