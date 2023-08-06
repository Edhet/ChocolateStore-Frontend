import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {CartComponent} from "./pages/cart/cart.component";
import {ProductsComponent} from "./pages/products/products.component";
import {LoginSignupComponent} from "./pages/login-signup/login-signup.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {authGuard} from "./services/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'login', component: LoginSignupComponent, canActivate: [authGuard]},
  {path: 'signup', component: LoginSignupComponent, canActivate: [authGuard]},
  {path: 'cart', component: CartComponent, canActivate: [authGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
