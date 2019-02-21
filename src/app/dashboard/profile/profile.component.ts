import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/shared-data.service";
import { UserService } from "src/app/api/user.service";

@Component({
  selector: "fmyp-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  updateSuccess: boolean = false;
  updateError: boolean = false;
  public enrollments: any;
  user: any;
  public enrollmentsLength: any;
  constructor(
    public sharedData: SharedDataService,
    private userService: UserService
  ) {}
  public userProfileLoading = true;
  ngOnInit() {
    this.userService
      .getProfile(this.sharedData.email)
      .toPromise()
      .then(document => {
        this.user = document;
        this.enrollments = this.user.enrollments;
        this.enrollmentsLength = this.enrollments.length;
        this.userProfileLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }



  updateProfile() {
    this.userService
      .updateProfile(this.user)
      .toPromise()
      .then(document => {
        this.updateSuccess = true;
        this.updateError = false;
      })
      .catch(err => {
        this.updateSuccess = false;
        this.updateError = true;
      });
  }
}
