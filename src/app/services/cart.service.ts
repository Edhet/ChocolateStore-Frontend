import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import ErrorDetails from "../types/error-details";
import {AuthService} from "./auth.service";
import environment from "../environment/environment";
import BuyOrder from "../types/buy-order";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly ADD_ENDPOINT = environment.apiUrl + "/cart/buy"
  private readonly REMOVE_ENDPOINT = environment.apiUrl + "/cart/remove"
  private readonly FINISH_ENDPOINT = environment.apiUrl + "/cart/finish"


  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  public async addProduct(order: BuyOrder): Promise<void | ErrorDetails> {
    const header = this.authService.getAuthHeader()
    const requestBody: any = {productId: order.product.id, amount: order.amount}
    let request = this.httpClient.post<void>(this.ADD_ENDPOINT, requestBody, {headers: header})

    return await firstValueFrom(request)
      .catch(r => r.error as ErrorDetails)
  }

  public async removeProduct(id: number): Promise<void | ErrorDetails> {
    const header = this.authService.getAuthHeader()
    let request = this.httpClient.request<void>("DELETE", this.REMOVE_ENDPOINT,
      {body: id, headers: header}
    )

    return await firstValueFrom(request)
      .catch(r => r.error as ErrorDetails)
  }

  public async finishBuy(): Promise<void | ErrorDetails> {
    const header = this.authService.getAuthHeader()
    let request = this.httpClient.post<void>(this.FINISH_ENDPOINT, null, {headers: header})

    return await firstValueFrom(request)
      .catch(r => r.error as ErrorDetails)
  }
}
