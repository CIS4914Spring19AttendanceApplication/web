import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ENV } from "../core/env.config";
import { SharedDataService } from "../shared-data.service";

@Injectable({
  providedIn: "root"
})
export class OrgService {
  baseUserURL: string = ENV.BASE_API + "/org/";
  constructor(
    private http: HttpClient,
    private sharedData: SharedDataService
  ) {}

  public createEvent(body) {
    return this.http.post(this.baseUserURL + "create", body, {
      observe: "response"
    });
  }

  public getOrgQR(orgName){
    return this.http.get(this.baseUserURL + "qr/" + orgName);
  }


}
