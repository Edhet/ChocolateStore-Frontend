import {Component, Input, ViewChild} from '@angular/core';
import Product from "../../types/product";
import {AmountSelectionComponent} from "../../modals/amount-selection/amount-selection.component";

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.scss']
})
export class ProductByCategoryComponent {
  @ViewChild('amountSelection') amountSelection?: AmountSelectionComponent
  @Input() productList: Product[] = []

  public async treatCardClick(product: Product) {
    this.amountSelection?.showAmountSelection(product)
  }
}
