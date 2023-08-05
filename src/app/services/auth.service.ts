import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import environment from "../environment/environment";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_ENDPOINT = environment.apiUrl + "/auth"
  private readonly SIGN_UP_ENDPOINT = environment.apiUrl + "/auth/signup"
  private readonly LOGIN_ENDPOINT = environment.apiUrl + "/auth/login"

  constructor(private httpClient: HttpClient) { }

  public async userIsLogged(): Promise<boolean> {
    let response = this.httpClient.get<boolean>(this.AUTH_ENDPOINT)
    return await firstValueFrom(response).then(r => r).catch(_r => false)
  }

  public async login() {

  }
}
