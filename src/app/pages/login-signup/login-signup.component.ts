import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {
  public creatingAccount = false;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.creatingAccount = this.router.url == "/signup"
  }
}
