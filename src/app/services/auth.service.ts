import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import environment from "../environment/environment";
import {firstValueFrom} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import LoginCredentials from "../types/login-credentials";
import ErrorDetails from "../types/error-details";
import User from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGIN_ENDPOINT = environment.apiUrl + "/auth/login"
  private readonly AUTH_ENDPOINT = environment.apiUrl + "/auth"
  private readonly SIGN_UP_ENDPOINT = environment.apiUrl + "/auth/signup"

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public async login(credentials: LoginCredentials): Promise<String | ErrorDetails> {
    let request = this.httpClient.post<String | ErrorDetails>(this.LOGIN_ENDPOINT, credentials)
    let response = await firstValueFrom(request)

    if (typeof response == "string")
      this.cookieService.set("token", response)
    return response
  }

  public async userIsLogged(): Promise<boolean> {
    const header = new HttpHeaders().set("Authorization", "Bearer " + this.cookieService.get("token"))
    let request = this.httpClient.get<boolean>(this.AUTH_ENDPOINT, {headers: header})

    return await firstValueFrom(request)
      .then(r => r)
      .catch(_r => false)
  }

  public async signup(newUser: User): Promise<true | ErrorDetails> {
    const header = new HttpHeaders().set("Authorization", "Bearer " + this.cookieService.get("token"))
    let request = this.httpClient.post<void | ErrorDetails>(this.SIGN_UP_ENDPOINT, newUser, {headers: header})

    return await firstValueFrom(request).then(_r => true)
  }
}
