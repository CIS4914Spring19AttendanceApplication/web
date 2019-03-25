import { Component, OnInit } from "@angular/core";
import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  
  constructor(private sharedData: SharedDataService) {}

  ngOnInit() {
    console.log(this.sharedData.activeOrg);
  }
}
