import {Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {PersonalInfoService} from "../../services/personal-info.service";
import BuyOrder from "../../types/buy-order";
import {ToastComponent} from "../../modals/toast/toast.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('toast') toast?: ToastComponent

  public orders: BuyOrder[] = []
  public cartTotal = 0

  public fetchingData = false

  constructor(private cartService: CartService, private personalInfoService: PersonalInfoService) {
  }

  async ngOnInit() {
    this.fetchingData = true

    const info = await this.personalInfoService.getUserInfo()
    this.orders = info.buyOrders ?? []
    this.calculateTotal()

    this.fetchingData = false
  }

  public async removeOrder(orderId: number) {
    this.fetchingData = true
    let response = await this.cartService.removeProduct(orderId)
    if (!response) {
      this.orders = this.orders.filter(order => order.id != orderId)
      this.calculateTotal()
    } else {
      this.toast?.showMessage(response.msg)
    }
    this.fetchingData = false
  }

  public async clearOrders() {
    this.fetchingData = true
    let response = await this.cartService.finishBuy()
    if (!response) {
      this.orders = []
      this.calculateTotal()
    } else {
      this.toast?.showMessage(response.msg)
    }
    this.fetchingData = false
  }

  private calculateTotal() {
    this.cartTotal = 0
    this.orders.forEach(order => this.cartTotal += order.product.price * order.amount)
  }
}
