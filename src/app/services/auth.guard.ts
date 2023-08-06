import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)

  const userIsLogged = await authService.userIsLogged()
  const goingToLoginSignupPage = route.routeConfig?.path == "login" || route.routeConfig?.path == "signup"

  if (!userIsLogged && !goingToLoginSignupPage) {
    await router.navigate(["login"])
    return false
  } else if (userIsLogged && goingToLoginSignupPage) {
    await router.navigate(["home"])
    return false
  }
  return true
};
