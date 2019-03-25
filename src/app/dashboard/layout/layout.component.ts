import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public orgName: String;

  constructor(public auth: AuthService, public sharedData: SharedDataService) {
  }

  ngOnInit() {
    this.orgName = "| " + this.sharedData.activeOrg;
  }

}
