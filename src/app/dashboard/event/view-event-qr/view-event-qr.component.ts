import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/api/event.service';

@Component({
  selector: 'fmyp-view-event-qr',
  templateUrl: './view-event-qr.component.html',
  styleUrls: ['./view-event-qr.component.css']
})
export class ViewEventQrComponent implements OnInit {

  private id: string;
  qr: any;
  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.eventService.getEventQRCode(this.id).toPromise()
    .then(doc => {
      console.log(doc);
     this.qr = doc.body;
    })
    .catch(err => {

    });

 }

}
