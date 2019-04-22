import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: "fmyp-refresh",
  templateUrl: "./refresh.component.html",
  styleUrls: ["./refresh.component.css"]
})
export class RefreshComponent implements OnInit {
  constructor(public router: Router, public sharedData: SharedDataService) {}

  ngOnInit() {


    this.router.navigate(["/dashboard/organizations"]);
  }
}
