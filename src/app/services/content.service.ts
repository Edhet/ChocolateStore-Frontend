import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import Product from "../types/product";
import ErrorDetails from "../types/error-details";
import environment from "../environment/environment";
import {firstValueFrom} from 'rxjs';
import Category from "../types/category";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly PRODUCTS_ENDPOINT = environment.apiUrl + "/products"
  private readonly CATEGORY_ENDPOINT = environment.apiUrl + "/category"

  constructor(private httpClient: HttpClient) { }

  public async getProduct(id: number): Promise<Product | ErrorDetails> {
    let request = this.httpClient.get<Product>(this.PRODUCTS_ENDPOINT + "/" + id)
    return await firstValueFrom(request)
      .catch(r => r.error as ErrorDetails)
  }

  public async getAllProducts(count?: number): Promise<Product[]> {
    let uri = this.PRODUCTS_ENDPOINT + "/all"
    if (count)
      uri = `${uri}/${count}`
    let request = this.httpClient.get<Product[]>(uri)
    return await firstValueFrom(request)
  }

  public async getCategoryNames(): Promise<String[]> {
    let request = this.httpClient.get<String[]>(this.CATEGORY_ENDPOINT + "/names")
    return await firstValueFrom(request)
  }

  public async getCategory(id: number): Promise<Category | ErrorDetails> {
    let request = this.httpClient.get<Category>(this.CATEGORY_ENDPOINT + "/" + id)
    return await firstValueFrom(request)
      .catch(r => r.error as ErrorDetails)
  }

  public async getAllCategories(): Promise<Category[]> {
    let request = this.httpClient.get<Category[]>(this.CATEGORY_ENDPOINT + "/all")
    return await firstValueFrom(request)
  }

}
