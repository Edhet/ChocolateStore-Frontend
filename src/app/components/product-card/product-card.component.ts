import {Component, Input} from '@angular/core';
import Product from "../../types/product";
import {createFakePrice, getImageByString} from 'src/app/util/util';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product?: Product

  constructor(private authService: AuthService, private router: Router) {
  }

  public async onClick() {
    if (!await this.authService.userIsLogged())
      await this.router.navigate(['/login'])
  }

  public createFakePrice(actualPrice: number) {
    return createFakePrice(actualPrice)
  }

  protected readonly getImageByString = getImageByString;
}
