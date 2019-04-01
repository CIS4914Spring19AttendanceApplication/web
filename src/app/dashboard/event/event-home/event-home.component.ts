import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';
import { UserService } from 'src/app/api/user.service';
import { MatDialog } from '@angular/material';
import { EventService } from 'src/app/api/event.service';

@Component({
  selector: 'fmyp-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css']
})
export class EventHomeComponent implements OnInit {

  public events: any;
  public eventrows: Number;
  public qr_code: string;
  qrLoading: boolean;
  constructor(
    public sharedData: SharedDataService,
    public eventService: EventService,
    public dialog: MatDialog,
  ) {}

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

  openEventQRView(event) {
    window.open("/event/view/qr/" + event._id, "_blank");
  }

}

