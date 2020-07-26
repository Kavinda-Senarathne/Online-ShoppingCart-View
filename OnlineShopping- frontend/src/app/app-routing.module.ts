import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ProductListComponent } from './product/product/product-list/product-list.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { ProductDetailsComponent } from './product/product/product-details/product-details.component';


const routes: Routes = [
  {
    path:'',component:ProductListComponent
  },
  {
    path: 'user',component:UserComponent,
    children:[
      {
        path:'registration',component:RegisterComponent
      },
      {
        path:'login',component:LoginComponent
      }
    ]
  },
  {path: 'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {
    path:'productdetails',component:ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
