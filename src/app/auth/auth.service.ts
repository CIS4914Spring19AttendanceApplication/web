import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth.config";
import { SharedDataService } from "../shared-data.service";
import { UserService } from "../api/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  returnUrl = "/dashboard";
  returnUrlActive: boolean = false;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: "token id_token",
    redirectUri: AUTH_CONFIG.REDIRECT,
    scope: AUTH_CONFIG.SCOPE
  });

  constructor(
    public router: Router,
    private sharedData: SharedDataService,
    private userService: UserService
  ) {
    this._idToken = "";
    this._accessToken = "";
    this._expiresAt = 0;
    9;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";
        this.localLogin(authResult);
        console.log(authResult);
        this.userService.onBoardCheck(authResult.idTokenPayload.name);
        if (localStorage.getItem("returnUrl")) {
          this.returnUrl = localStorage.getItem("returnUrl");
        } else {
          this.returnUrl = "/dashboard";
        }
        localStorage.removeItem("returnUrl");
        this.router.navigate([this.returnUrl]);
      } else if (err) {
        this.router.navigate(["/"]);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");
    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    this.sharedData.accessToken = this._accessToken;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = "";
    this._idToken = "";
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");
    // Go back to the home route
    this.router.navigate(["/"]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }
}
