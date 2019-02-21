import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fmyp-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  description: string;

  constructor() { }

  ngOnInit() {
  }

}
