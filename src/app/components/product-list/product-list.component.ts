import {Component, Input, ViewChild} from '@angular/core';
import Product from "../../types/product";
import {AmountSelectionComponent} from "../../modals/amount-selection/amount-selection.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @ViewChild('amountSelection') amountSelection?: AmountSelectionComponent
  @Input() productList: Product[] = []

  public async treatCardClick(product: Product) {
    this.amountSelection?.showAmountSelection(product)
  }
}
