import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../services/content.service";
import Category from "../../types/category";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public categoryWithProducts: Category[] = [];

  constructor(private contentService: ContentService) {
  }

  async ngOnInit(){
    this.categoryWithProducts = await this.contentService.getAllCategories();
  }

}
