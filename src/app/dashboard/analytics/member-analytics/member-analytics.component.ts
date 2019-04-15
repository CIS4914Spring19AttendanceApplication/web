import { Component, OnInit } from '@angular/core';
import { RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/shared-data.service';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'fmyp-member-analytics',
  templateUrl: './member-analytics.component.html',
  styleUrls: ['./member-analytics.component.css']
})
export class MemberAnalyticsComponent implements OnInit {
  chartDataLoaded: boolean;
  cats: any;
  catsLength: any;

  constructor(private route: ActivatedRoute, public sharedData: SharedDataService, private userService: UserService) { }
  id: any;
  point_status: any;
  events: any;
  public pieChartLabels = [
    "Attended",
    "Missed"
  ];
  public pies = [];
  public pieChartType = "pie";

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id != null) {
      this.userService.getUserHistory(this.id)
      .toPromise()
      .then(doc =>{
        var count = 0;
        while(doc[count] != null || doc[count] != undefined){
          console.log(this.events);
          if(doc[count].org == this.sharedData.activeOrg){
            console.log(doc[count]);
            this.events = doc[count].events;
            this.cats = doc[count].point_status;
            for(var i = 0; i < this.cats.length; i++){
              this.pies.push({
                name: this.cats[i].category,
                data: [this.cats[i].current_points, this.cats[i].total_points - this.cats[i].current_points]
              });
            }
           
            this.chartDataLoaded = true;
            break;
          }
          count++;
        }
      })
      .catch(err => {

      });
    }
  }
  

}
