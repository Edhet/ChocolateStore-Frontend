import { Component, Input } from '@angular/core';
import Product from "../../types/product";
import {createFakePrice, getImageByString} from "../../util/util";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() productList: Product[] = []

  public createFakePrice(actualPrice: number) {
    return createFakePrice(actualPrice)
  }

    protected readonly getImageByString = getImageByString;
}
