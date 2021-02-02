import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

import { GuardAuthGuard } from './shared/guard/guard-auth.guard';
import { CheckLoginGuard } from './shared/guard/check-login.guard';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  
  {
    path: 'store/all',
    loadChildren: () => import('./component/lazy_loading/store-all/store-all.module').then(m => m.StoreAllModule)
  },

  {
    path: 'store/all/:category',
    loadChildren: () => import('./component/lazy_loading/store-all/store-all.module').then(m => m.StoreAllModule)
  },

  {
    path: 'tienda/mujer',
    loadChildren: () => import('./component/lazy_loading/store/store.module').then(m => m.StoreModule)
  },

  {
    path: 'tienda/mujer/:category',
    loadChildren: () => import('./component/lazy_loading/store/store.module').then(m => m.StoreModule)
  },

  {
    path: 'tienda/hombre',
    loadChildren: () => import('./component/lazy_loading/store-man/store-man.module').then(m => m.StoreManModule)
  },  

  {
    path: 'tienda/hombre/:category',
    loadChildren: () => import('./component/lazy_loading/store-man/store-man.module').then(m => m.StoreManModule)
  },

  {
    path: 'tienda/nina',
    loadChildren: () => import('./component/lazy_loading/store-girl/store-girl.module').then(m => m.StoreGirlModule)
  },  

  {
    path: 'tienda/nina/:category',
    loadChildren: () => import('./component/lazy_loading/store-girl/store-girl.module').then(m => m.StoreGirlModule)
  },

  {
    path: 'tienda/nino',
    loadChildren: () => import('./component/lazy_loading/store-boy/store-boy.module').then(m => m.StoreBoyModule)
  },  

  {
    path: 'tienda/nino/:category',
    loadChildren: () => import('./component/lazy_loading/store-boy/store-boy.module').then(m => m.StoreBoyModule)
  },
  
  {
    path: 'details/:id',
    loadChildren: () => import('./component/lazy_loading/detail-product/detail-product.module').then(m => m.DetailProductModule)
  },

  {
    path: 'cart',
    loadChildren: () => import('./component/lazy_loading/view-cart/view-cart.module').then(m => m.ViewCartModule)
  },

  {
    path: 'checkout',
    loadChildren: () => import('./component/lazy_loading/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [GuardAuthGuard]
  },

  {
    path: 'ayuda',
    loadChildren: () => import('./component/lazy_loading/help/help.module').then(m => m.HelpModule)
  },

  {
    path: 'nosotros',
    loadChildren: () => import('./component/lazy_loading/us/us.module').then(m => m.UsModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./component/shared/login/login.module').then(m => m.LoginModule),
    canActivate: [CheckLoginGuard]
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
