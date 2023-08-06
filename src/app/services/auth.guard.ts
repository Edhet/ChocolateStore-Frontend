import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)

  const userIsLogged = await authService.userIsLogged()
  const goingToLoginPage = route.routeConfig?.path == "login"

  if (!userIsLogged && !goingToLoginPage) {
    await router.navigate(["login"])
    return false
  } else if (userIsLogged && goingToLoginPage) {
    await router.navigate(["home"])
    return false
  }
  return true
};
