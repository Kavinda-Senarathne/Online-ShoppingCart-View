import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';

import {UserService} from './shared/user.service';
import {ProductService} from 'src/app/shared/product.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './user/login/login.component';
import { ProductCardComponent } from './product/product/product-card/product-card.component';
import { ProductListComponent } from './product/product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product/product-details/product-details.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { AuthInterceptor } from './auth/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    NavBarComponent,
    LoginComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({progressBar:true})
  ],
  providers: [UserService,{
provide:HTTP_INTERCEPTORS,
useClass:AuthInterceptor,
multi:true


  },ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
