import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth.config";
import { SharedDataService } from "../shared-data.service";
import { UserService } from "../api/user.service";
import { resolve } from "q";
import { environment } from "src/environments/environment";
import { ENV } from "../core/env.config";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  returnUrl = "/dashboard";

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: "token id_token",
    redirectUri: AUTH_CONFIG.REDIRECT,
    scope: AUTH_CONFIG.SCOPE,
    audience: AUTH_CONFIG.AUDIENCE
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
        this.localLogin(authResult);
        this.userService
          .onBoardCheck(authResult.idTokenPayload.name)
          .toPromise()
          .then(data => {
            if (localStorage.getItem("returnUrl")) {
              this.returnUrl = localStorage.getItem("returnUrl");
              localStorage.removeItem("returnUrl");
            } else {
              this.returnUrl = "/dashboard";
            }
            this.userService.getActiveOrg()
            .toPromise()
            .then(data => {
              
              console.log(data[0]);
              this.sharedData.activeOrg = data[0].organization;
              this.sharedData.activeOrgID = data[0].organization_id;
              this.router.navigate([this.returnUrl]);

            })
            .catch(err => {
              this.sharedData.activeOrg = null;
              this.router.navigate([this.returnUrl]);
            });
          })
          .catch(err => {
            this.returnUrl = "/register";
            this.router.navigate([this.returnUrl]);
          });
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
    this.sharedData.email = authResult.idTokenPayload.name;
    this.sharedData.activeOrg = localStorage.getItem('activeOrg');
    localStorage.removeItem('activeOrg');
    this.sharedData.activeOrg = localStorage.getItem('activeOrgID');
    localStorage.removeItem('activeOrgID');

  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) { 
        // alert(
        //   `Could not get a new token (${err.error}: ${err.error_description}).`
        // );
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
    this.auth0.logout({
      returnTo: ENV.BASE_URI,
      client_id: AUTH_CONFIG.CLIENT_ID
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }
}
