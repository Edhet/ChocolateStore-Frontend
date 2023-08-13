import {Component, Input} from '@angular/core';
import Product from "../../types/product";
import {createFakePrice, getImageByString} from 'src/app/util/util';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent {
  @Input() productList: Product[] = []

  public createFakePrice(actualPrice: number) {
    return createFakePrice(actualPrice)
  }

    protected readonly getImageByString = getImageByString;
}
