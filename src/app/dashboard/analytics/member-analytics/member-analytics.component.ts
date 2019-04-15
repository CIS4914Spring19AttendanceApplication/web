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
  public firstName: any;
  public lastName: any;

  constructor(private route: ActivatedRoute, public sharedData: SharedDataService, private userService: UserService) { }
  id: any;
  point_status: any;
  events: any;
  public pieChartLabels = [
    "Current Points",
    "Points Needed"
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
              var neededPoints;
              var totalPoints = this.cats[i].total_points;
              var currentPoints = this.cats[i].current_points;
              if((totalPoints - currentPoints) < 0){
                neededPoints = 0;
              }
              else {
                neededPoints = totalPoints - currentPoints;
              }
              this.pies.push({
                name: this.cats[i].category,
                data: [this.cats[i].current_points, neededPoints]
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
      this.userService.getProfile(this.id)
      .toPromise()
      .then(docs=>{
        this.firstName = docs['first_name'];
        this.lastName = docs['last_name'];
      })
      .catch(err=>{
        console.log(err);
      });
    }
  }
  

}
