import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import UserInfo from "../../types/user-info";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userInfo?: UserInfo;

  constructor(private authService: AuthService, private router: Router) {
  }

  async ngOnInit() {
    this.userInfo = await this.authService.getUserInfo()
  }

  public async logOut() {
    this.authService.logout();
    await this.router.navigate(["home"])
  }
}
