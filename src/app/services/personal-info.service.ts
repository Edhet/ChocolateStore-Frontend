import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import environment from "../environment/environment";
import Address from "../types/address";
import ErrorDetails from "../types/error-details";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import UserInfo from "../types/user-info";

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private readonly USER_ADDRESS_ENDPOINT: string = environment.apiUrl + "/address"
  private readonly PREFERRED_CATEGORY_ENDPOINT: string = environment.apiUrl + "/info/category"
  private readonly USER_INFO_ENDPOINT = environment.apiUrl + "/info"

  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  public async getUserInfo(): Promise<UserInfo> {
    const header = this.authService.getAuthHeader()
    let request = this.httpClient.get<UserInfo>(this.USER_INFO_ENDPOINT, {headers: header})

    return await firstValueFrom(request)
  }

  public async updateAddress(address: Address): Promise<void | ErrorDetails> {
    const header = this.authService.getAuthHeader()
    let request = this.httpClient.put<void>(this.USER_ADDRESS_ENDPOINT, address, {headers: header})

    return await firstValueFrom(request)
      .catch(r => r.error as ErrorDetails)
  }

  public async updatePreferredCategory(categoryName: string): Promise<void | ErrorDetails> {
    const header = this.authService.getAuthHeader()
    let request = this.httpClient.put<void>(this.PREFERRED_CATEGORY_ENDPOINT, categoryName, {headers: header})

    return await firstValueFrom(request)
      .catch(r => r.error as ErrorDetails)
  }
}
