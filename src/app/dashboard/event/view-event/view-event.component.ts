import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fmyp-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
  id: string;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

  }

  ngOnInit() {
  }

}
