import { Injectable } from '@angular/core';

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
  public accessToken: any;
  public email: string;
  

}
