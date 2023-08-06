import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  public async logOut() {
    this.authService.logout();
    await this.router.navigate(["home"])
  }
}
