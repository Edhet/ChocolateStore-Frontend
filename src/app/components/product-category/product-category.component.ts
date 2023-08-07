import {Component, Input} from '@angular/core';
import Category from "../../types/category";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {
  @Input() public category?: Category

  constructor(private authService: AuthService, private router: Router) {
  }

  // TODO: Buy logic
  public async buyProduct(productId: number) {
    if (!await this.authService.userIsLogged()) {
      await this.router.navigate(["login"])
      return
    }
    console.log("proceed buy")
  }
}
