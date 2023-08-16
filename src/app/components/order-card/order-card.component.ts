import {Component, EventEmitter, Input, Output} from '@angular/core';
import BuyOrder from "../../types/buy-order";
import {getImageByString} from "../../util/util";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() order?: BuyOrder
  @Output() removed: EventEmitter<number> = new EventEmitter<number>()

  protected readonly getImageByString = getImageByString;
}
