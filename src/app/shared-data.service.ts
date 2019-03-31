import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { 
  }
  public organizationTitle = 'Organizations';
  public organizationDesc = 'Create, edit or view organizations you are currently managing.';
  public profileTitle = 'My Profile';
  public profileDesc = 'Edit or view your profile.';
  public eventsTitle = 'Events';
  public accessToken: any;
  public email: string;
  public activeOrg: string;
  public activeOrgID: string;
  public eventsDesc = 'Create, edit or view your events for ' + this.activeOrg + '.';

  

}
