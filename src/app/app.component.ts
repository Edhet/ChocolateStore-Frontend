import { Component } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DuCacau';

  private readonly fullscreenUrls = ['/login', '/signup', '/404']
  public isNonFullscreenPage = true;

  constructor(public router: Router) {
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd)
          this.isNonFullscreenPage = !(this.fullscreenUrls.includes(event.urlAfterRedirects))
      })
  }

  protected readonly window = window;
}
