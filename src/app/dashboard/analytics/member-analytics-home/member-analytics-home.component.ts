import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';
import { EventService } from 'src/app/api/event.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import * as jsPDF from 'jspdf'


@Component({
  selector: 'fmyp-member-analytics-home',
  templateUrl: './member-analytics-home.component.html',
  styleUrls: ['./member-analytics-home.component.css']
})
export class MemberAnalyticsHomeComponent implements OnInit {

  memberEmails: any;
  public memberInfo = [];
  navigateUrl: string;

  constructor(public sharedData: SharedDataService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsersByOrg(this.sharedData.activeOrgID)
    .toPromise()
    .then(doc => {
      this.memberEmails = doc[0].member;
      var length = this.memberEmails.length;
      for (var i = 0; i < length; i++) {
          this.userService.getProfile(this.memberEmails[i])
          .toPromise()
          .then(doc=>{
            this.memberInfo.push(doc);
          })
          .catch(err=>{

          })
      }
    })
    .catch(err=>{

    });
  }

  openMemberAnalytics(member) {
    console.log('yes');
    this.navigateUrl = '/dashboard/analytics/member/' + member.email;
    console.log(this.navigateUrl);
    this.router.navigate([this.navigateUrl]);
  }
}
