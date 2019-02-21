import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public sharedData: SharedDataService) {
  }

  ngOnInit() {
    console.log(this.sharedData.accessToken)
  }

}
