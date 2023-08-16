import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import LoginCredentials from "../../types/login-credentials";
import {Router} from "@angular/router";
import {ToastComponent} from "../../modals/toast/toast.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('toast') toast?: ToastComponent

  public userCredentials: LoginCredentials = {email: "", password: ""}
  public errorMessage?: string

  public fetchingRequest = false

  constructor(private authService: AuthService, private router: Router) {
  }

  public async tryLogin() {
    this.errorMessage = undefined
    if (!this.userCredentials.email || !this.userCredentials.password) {
      this.toast?.showMessage("Preencha todos os campos")
      return
    }

    this.fetchingRequest = true
    const response = await this.authService.login(this.userCredentials)
    if (!response) {
      await this.router.navigate(["profile"])
    } else {
      this.toast?.showMessage(response.msg)
      this.fetchingRequest = false
    }
  }
}
