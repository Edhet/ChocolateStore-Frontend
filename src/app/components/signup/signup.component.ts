import {Component} from '@angular/core';
import Gender from "../../types/gender";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import UserRegisterInformation from "../../types/user-register-information";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public userCredentials: UserRegisterInformation = {
    firstName: "",
    surname: "",
    email: "",
    password: "",
    birthDate: "",
    gender: Gender.MALE
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  // TODO: Show error messages
  public async signUp() {
    if (!this.userCredentials.firstName || !this.userCredentials.surname ||
    !this.userCredentials.email || !this.userCredentials.password ||
    new Date(this.userCredentials.birthDate).getTime() > Date.now())
      return;

    const response = await this.authService.signup(this.userCredentials)
    if (!response)
      await this.router.navigate(["login"])
  }

}
