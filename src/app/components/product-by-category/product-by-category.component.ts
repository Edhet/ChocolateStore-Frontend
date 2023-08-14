import {Component, Input} from '@angular/core';
import Product from "../../types/product";
import {createFakePrice, getImageByString} from 'src/app/util/util';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.scss']
})
export class ProductByCategoryComponent {
  @Input() productList: Product[] = []

  public createFakePrice(actualPrice: number) {
    return createFakePrice(actualPrice)
  }

    protected readonly getImageByString = getImageByString;
}
