import {Component, OnInit} from '@angular/core';
import Product from "../../types/product";
import {ContentService} from "../../services/content.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public carrouselIndex = 1

  public readonly SELECTED_CARROUSEL: string = "w-6 bg-dark"
  public readonly UNSELECTED_CARROUSEL: string = "w-3 bg-light"

  private readonly CARROUSEL_SECONDS = 8000

  private readonly AMOUNT_OF_PRODUCTS: number = 6
  public products: Product[] = []

  constructor(private contentService: ContentService) {
  }

  async ngOnInit() {
    this.products = await this.contentService.getAllProducts(this.AMOUNT_OF_PRODUCTS)
    this.startCarrouselRotation()
  }

  private async startCarrouselRotation() {
    while(true) {
      await new Promise(resolve => setTimeout(resolve, this.CARROUSEL_SECONDS));
      if (this.carrouselIndex + 1 == 4) this.carrouselIndex = 1
      else this.carrouselIndex++
    }

  }
}
