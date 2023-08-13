import {Component, ViewChild} from '@angular/core';
import Gender from "../../types/gender";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import UserRegisterInformation from "../../types/user-register-information";
import {ToastComponent} from "../../modals/toast/toast.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('toast') toast?: ToastComponent

  public readonly TODAY = new Date()

  public userCredentials: UserRegisterInformation = {
    firstName: "",
    surname: "",
    email: "",
    password: "",
    birthDate: "",
    gender: Gender.MALE
  }
  public fetchingRequest = false

  constructor(private authService: AuthService, private router: Router) {
  }

  public async signUp() {
    if (!this.userCredentials.firstName || !this.userCredentials.surname ||
      !this.userCredentials.email || !this.userCredentials.password ||
      new Date(this.userCredentials.birthDate).getTime() > Date.now()) {
      this.toast?.showMessage("Preencha todos os campos")
      return
    }

    this.fetchingRequest = true
    const response = await this.authService.signup(this.userCredentials)
    if (!response) {
      await this.router.navigate(["login"])
    } else {
      this.toast?.showMessage(response.msg)
      this.fetchingRequest = false
    }
  }
}
