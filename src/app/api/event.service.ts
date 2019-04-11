import { Injectable } from "@angular/core";
import { ENV } from "../core/env.config";
import { SharedDataService } from "../shared-data.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class EventService {
  baseUserURL: string = ENV.BASE_API + "/event/";
  
  constructor(private http: HttpClient, public sharedData: SharedDataService) {}

  public getEventsByOrg(orgName) {
    return this.http.get(this.baseUserURL + "get/byorg/" + orgName, {
      observe: "response"
    });
  }

  public createEvent(event){
    return this.http.post(this.baseUserURL+ "create", event, {
      observe: "response" 
    });
  }

  public getEventQRCode(eventID){
    return this.http.get(this.baseUserURL+ "get/qr/" + eventID, {
      observe: "response"
    });
  }

  public getEventName(eventID){
    return this.http.get(this.baseUserURL+ "get/name/" + eventID, {
      observe: "response"
    }); 
  }

  public toggleEventAttendance(eventID){
    var event = {
      _id: eventID
    };
    return this.http.post(this.baseUserURL+ "toggleAttendance", event, {
      observe: "response"
    }); 
  }

  public getCheckInResponses(eventID){
    return this.http.get(this.baseUserURL+ "get/checkin/responses/" + eventID, {
      observe: "response"
    });
  }

}
