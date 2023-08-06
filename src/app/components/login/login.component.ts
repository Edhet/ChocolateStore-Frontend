import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import LoginCredentials from "../../types/requests/login-credentials";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userCredentials: LoginCredentials = {email: "", password: ""};
  public errorMessage?: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  // TODO: Show error information
  public async tryLogin() {
    if (!this.userCredentials.email || !this.userCredentials.password)
      return

    const response = await this.authService.login(this.userCredentials)

    if (response)
      await this.router.navigate(["profile"])
  }
}
