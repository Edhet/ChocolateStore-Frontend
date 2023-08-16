import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import environment from "../environment/environment";
import {firstValueFrom} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import LoginCredentials from "../types/login-credentials";
import ErrorDetails from "../types/error-details";
import UserInfo from "../types/user-info";
import Address from "../types/address";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly JWT_COOKIE_NAME = "token"

  private readonly LOGIN_ENDPOINT = environment.apiUrl + "/auth/login"
  private readonly AUTH_ENDPOINT = environment.apiUrl + "/auth"
  private readonly SIGN_UP_ENDPOINT = environment.apiUrl + "/auth/signup"

  private readonly SET_PREFERRED_ENDPOINT = environment.apiUrl + "/info/category"
  private readonly SET_ADDRESS_ENDPOINT = environment.apiUrl + "/address"

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public async userIsLogged(): Promise<boolean> {
    if (!this.cookieService.get(this.JWT_COOKIE_NAME))
      return false

    const header = this.getAuthHeader()
    let request = this.httpClient.get(this.AUTH_ENDPOINT, {headers: header})

    return await firstValueFrom(request)
      .then(_r => true)
      .catch(_r => false)
  }

  public async login(credentials: LoginCredentials): Promise<void | ErrorDetails> {
    let request = this.httpClient.post<any>(this.LOGIN_ENDPOINT, credentials)
    let response = await firstValueFrom(request)
      .then(r => r.token)
      .catch(r => r.error as ErrorDetails)

    if (typeof response != "string")
      return response
    this.cookieService.set(this.JWT_COOKIE_NAME, response)
  }

  public logout(): void {
    this.cookieService.set(this.JWT_COOKIE_NAME, "")
  }

  public async signup(newUser: UserInfo): Promise<void | ErrorDetails> {
    const header = this.getAuthHeader()
    let request = this.httpClient.post<void>(this.SIGN_UP_ENDPOINT, newUser, {headers: header})

    return await firstValueFrom(request)
      .catch(r => r.error as ErrorDetails)
  }

  public async setAddress(address: Address): Promise<void | ErrorDetails> {
    const header = this.getAuthHeader()
    let request = this.httpClient.put<void>(this.SET_ADDRESS_ENDPOINT, address, {headers: header})

    return await firstValueFrom(request)
        .catch(r => r.error as ErrorDetails)
  }

  public async setPreferredCategory(categoryName: string): Promise<void | ErrorDetails> {
    const header = this.getAuthHeader()
    let request = this.httpClient.put<void>(this.SET_PREFERRED_ENDPOINT, categoryName, {headers: header})

    return await firstValueFrom(request)
        .catch(r => r.error as ErrorDetails)
  }

  public getAuthHeader(): HttpHeaders {
    return new HttpHeaders().set("Authorization", "Bearer " + this.cookieService.get(this.JWT_COOKIE_NAME))
  }
}
