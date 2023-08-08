import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public readonly INACTIVE_PAGE_STYLE: string = "before:h-0 hover:before:h-1.5"
  public readonly ACTIVE_PAGE_STYLE : string = "before:h-full text-light"

  public showHamburgerMenu = false

  constructor(public router: Router) {
  }
}
