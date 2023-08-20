import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../services/content.service";
import Category from "../../types/category";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public categoryFilters: string[] = []

  public inactiveCategories: string[] = []

  public minPrice = Number.MAX_VALUE
  public maxPrice = 0
  public priceFilter?: number

  public JSONcategoryProducts: string = ""
  public filteredCategoryProducts: Category[] = []

  public fetchingData = true

  constructor(private contentService: ContentService) {
  }

  async ngOnInit() {
    this.categoryFilters = await this.contentService.getCategoryNames()
    const data = await this.contentService.getAllCategories()

    this.getMinMaxPrices(data)
    this.JSONcategoryProducts = JSON.stringify(data)

    this.applyFilters()
    this.fetchingData = false
  }

  public getMinMaxPrices(data: Category[]) {
    for (const category of data)
      category.products.forEach(prod => {
        if (prod.price > this.maxPrice) this.maxPrice = prod.price
        if (prod.price < this.minPrice) this.minPrice = prod.price
      })
    this.priceFilter = this.maxPrice
  }

  public applyFilters() {
    const fullList = JSON.parse(this.JSONcategoryProducts) as Category[]

    let filteredInfo = fullList.filter(category => !this.inactiveCategories.includes(category.name))
    for (const category of filteredInfo)
      category.products = category.products.filter(product => product.price <= (this.priceFilter ?? Number.MAX_VALUE))
    filteredInfo = filteredInfo.filter(category => category.products.length > 0)

    this.filteredCategoryProducts = filteredInfo
  }

  public changeCategoryFilter(categoryName: string) {
    if (!this.inactiveCategories.includes(categoryName)) {
      this.inactiveCategories.push(categoryName)
    } else {
      const stringIndex = this.inactiveCategories.indexOf(categoryName)
      this.inactiveCategories.splice(stringIndex, 1)
    }
    this.applyFilters()
  }
}
