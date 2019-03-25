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
  constructor(
    public sharedData: SharedDataService,
    public event: EventService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.event
      .getActiveEvents(this.sharedData.activeOrg)
      .toPromise()
      .then(doc => {
        this.events = doc.body;
        console.log(this.events);
      })
      .catch(err => {});
  }
}

