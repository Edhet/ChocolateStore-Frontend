import {Component, Input} from '@angular/core';
import Product from "../../types/product";
import { createFakePrice, getImageByString } from 'src/app/util/util';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    @Input() product?: Product

    public createFakePrice(actualPrice: number) {
        return createFakePrice(actualPrice)
    }

    protected readonly getImageByString = getImageByString;
}
