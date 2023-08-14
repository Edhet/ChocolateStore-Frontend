import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {HomeComponent} from './pages/home/home.component';
import {ProductsComponent} from './pages/products/products.component';
import {CartComponent} from './pages/cart/cart.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {LoginSignupComponent} from './pages/login-signup/login-signup.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import {SignupComponent} from './components/signup/signup.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgOptimizedImage} from "@angular/common";
import {FooterComponent} from './components/footer/footer.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ProductByCategoryComponent} from './components/product-by-category/product-by-category.component';
import { ToastComponent } from './modals/toast/toast.component';
import {ModalsModule} from "./modals/modals.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    ProfileComponent,
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    AboutUsComponent,
    PageNotFoundComponent,
    ProductByCategoryComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
    ModalsModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
