import {Component, EventEmitter, Output} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {PersonalInfoService} from "../../services/personal-info.service";
import BuyOrder from "../../types/buy-order";
import Product from "../../types/product";
import {animate, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-amount-selection',
  templateUrl: './amount-selection.component.html',
  styleUrls: ['./amount-selection.component.scss'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('150ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class AmountSelectionComponent {
  @Output() errorMessageEmitter: EventEmitter<string> = new EventEmitter<string>()

  public showingSelection = false
  public buyOrder?: BuyOrder

  constructor(private personalInfoService: PersonalInfoService,
              private authService: AuthService,
              private router: Router,
              private cartService: CartService
  ) {
  }

  public async showAmountSelection(product: Product) {
    if (!await this.authService.userIsLogged()) {
      await this.router.navigate(['/login'])
      return
    }
    const orders = (await this.personalInfoService.getUserInfo()).buyOrders ?? []
    const hasOrder = orders.some(order => order.product.id == product.id)
    if (hasOrder) {
      await this.router.navigate(['/cart'])
      return
    }
    this.buyOrder = {product: product, amount: 1}
    this.showingSelection = true
  }

  public addAmount() {
    this.buyOrder!.amount++
  }

  public subtractAmount() {
    this.buyOrder!.amount--
  }

  public async addItem() {
    if (!this.buyOrder)
      return
    let response = await this.cartService.addProduct(this.buyOrder)
    if (response)
      this.errorMessageEmitter.emit(response.msg)
    this.showingSelection = false
  }
}
