import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';
import { EventService } from 'src/app/api/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fmyp-event-analytics-home',
  templateUrl: './event-analytics-home.component.html',
  styleUrls: ['./event-analytics-home.component.css']
})
export class EventAnalyticsHomeComponent implements OnInit {

  constructor(public sharedData: SharedDataService, private eventService: EventService, private router: Router) { }

   public events: any;
  public eventrows: Number;
  public qr_code: string;
  qrLoading: boolean;
  public navigateUrl; 

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

  openEventAnalytics(event) {
    console.log('yes');
    this.navigateUrl = '/dashboard/analytics/event/' + event._id;
    console.log(this.navigateUrl);
    this.router.navigate([this.navigateUrl]);
  }

}
