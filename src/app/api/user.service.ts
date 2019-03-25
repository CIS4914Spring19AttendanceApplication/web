import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ENV } from "../core/env.config";
import { SharedDataService } from "../shared-data.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUserURL: string = ENV.BASE_API + "/user/";
  constructor(
    private http: HttpClient,
    private sharedData: SharedDataService
  ) {}

  public onBoardCheck(email: string) {
    return this.http.get(this.baseUserURL + "onboardcheck/" + email, {
      observe: "response"
    });
  }

  public logOut() {
    return this.http.get("https://rollcall-app.auth0.com/v2/logout", {
      observe: "response"
    });
  }

  public register(body) {
    return this.http.post(this.baseUserURL + "registeruser", body);
  }

  public getProfile(email: string) {
    return this.http.get(ENV.BASE_API + "/user/get/" + email);
  }

  public updateProfile(body) {
    return this.http.post(this.baseUserURL + "update", body);
  }

  public getEnrollments(email: string){
    return this.http.get(this.baseUserURL + 'get/enrollments/' + email);
  }

  public getBoardEnrollments(email: string){
    return this.http.get(this.baseUserURL + 'get/boardenrollments/' + email);
  }

  public activateOrg(body){
    return this.http.post(this.baseUserURL + "set/activeorg", body);

  }

  public getActiveOrg(){
    return this.http.get(this.baseUserURL + 'get/activeorg/' + this.sharedData.email);
  }
}
