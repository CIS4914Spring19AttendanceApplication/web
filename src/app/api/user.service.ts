import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from '../core/env.config';
import { SharedDataService } from '../shared-data.service';

@Injectable({
  providedIn: "root"
})

export class UserService {
  constructor(private http: HttpClient, private sharedData: SharedDataService) {
  }


  public onBoardCheck(email : string) {
    this.http.get(ENV.BASE_API+'/user/onboardcheck/' + email) 
    .subscribe(
      data => console.log(data),
      err => console.log(err)
    );
    return this.http.get(ENV.BASE_API+'/user/onboardcheck/' + email);

  }



}
