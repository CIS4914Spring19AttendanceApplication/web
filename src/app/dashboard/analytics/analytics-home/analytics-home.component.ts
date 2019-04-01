import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';
import { EventService } from 'src/app/api/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fmyp-analytics-home',
  templateUrl: './analytics-home.component.html',
  styleUrls: ['./analytics-home.component.css']
})
export class AnalyticsHomeComponent implements OnInit {

  constructor(public sharedData: SharedDataService, private eventService: EventService, private router: Router) { }

   public events: any;
  public eventrows: Number;
  public qr_code: string;
  qrLoading: boolean;

  ngOnInit() {
    console.log(this.sharedData.activeOrg);
    console.log(this.sharedData.activeOrgID);
    this.eventService
      .getEventsByOrg(this.sharedData.activeOrg)
      .toPromise()
      .then(doc => {
        this.events = doc.body;
        console.log(this.events);
      })
      .catch(err => {});
  }

  openEventAnalytics() {
    this.router.navigate(['/dashboard']);
  }

}
