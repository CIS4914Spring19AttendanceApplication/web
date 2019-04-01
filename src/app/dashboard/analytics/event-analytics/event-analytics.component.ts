import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/shared-data.service";
import { EventService } from "src/app/api/event.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/api/user.service";
import { ChartsModule } from "ng2-charts";

@Component({
  selector: "fmyp-event-analytics",
  templateUrl: "./event-analytics.component.html",
  styleUrls: ["./event-analytics.component.css"]
})
export class EventAnalyticsComponent implements OnInit {
  private id: any;
  public pieChartLabels = ["Freshmen", "Sophomores", "Juniors", "Seniors"];
  public pieChartData = [];
  public pieChartType = "pie";
  public doneLoading = false;
  public doc: any;
  public attended: any;
  public colors = ['#FD1F5E','#1EF9A1','#7FFD1F','#68F000'];
  constructor(
    public sharedData: SharedDataService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.userService
      .getEventMemberAnalytics(this.id)
      .toPromise()
      .then(doc => {
        this.doc = doc;
        this.attended = doc["attended"];
        var freshman;
        var sophomore;
        var junior;
        var senior;
        if (doc["freshman"].attended == undefined) {
          freshman = 0;
        } else {
          freshman = doc["freshman"].attended.length;
        }
        if (doc["sophomore"].attended == undefined) {
          sophomore = 0;
        } else {
          sophomore = doc["sophomore"].attended.length;
        }
        if (doc["junior"].attended == undefined) {
          junior = 0;
        } else {
          junior = doc["junior"].attended.length;
        }
        if (doc["senior"].attended == undefined) {
          senior = 0;
        } else {
          senior = doc["senior"].attended.length;
        }

        this.pieChartData = [freshman, sophomore, junior, senior];
        // this.pieChartData = [120, 150, 180, 90];
        console.log(this.attended);
      })
      .catch(err => {});

  }
}
