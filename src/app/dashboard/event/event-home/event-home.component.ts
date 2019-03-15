import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'fmyp-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css']
})
export class EventHomeComponent implements OnInit {

  constructor(public sharedData: SharedDataService) { }

  ngOnInit() {
  }

}
