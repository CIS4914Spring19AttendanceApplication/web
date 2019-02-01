import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../api/user.service";
import { SharedDataService } from "../shared-data.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private userService: UserService,
    private sharedData: SharedDataService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this._authService.isAuthenticated() &&
      this.userService.onBoardCheck(this.sharedData.email)
    ) {
      return true;
    }
    localStorage.setItem("returnUrl", state.url);
    this._router.navigate(["/login"]);
    return false;
  }
}
