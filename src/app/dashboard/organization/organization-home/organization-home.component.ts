import { Component, OnInit, Inject } from "@angular/core";
import { SharedDataService } from "src/app/shared-data.service";
import { UserService } from "src/app/api/user.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OrgService } from "src/app/api/org.service";

export interface OrgEnrollData {
  name: string;
  qr_code: string;
}

@Component({
  selector: "org-enroll-dialog",
  templateUrl: "org-enroll-dialog.html"
})
export class OrgEnrollDialog {
  constructor(
    public dialogRef: MatDialogRef<OrgEnrollDialog>,
    @Inject(MAT_DIALOG_DATA) public data: OrgEnrollData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "fmyp-organization-home",
  templateUrl: "./organization-home.component.html",
  styleUrls: ["./organization-home.component.css"]
})
export class OrganizationHomeComponent implements OnInit {
  public enrollments: any;
  public enrollrows: Number;
  public qr_code: string;
  public orgsLoading = true;
  public enrollLoading = false;
  public activateLoading = false;

  constructor(
    public sharedData: SharedDataService,
    public orgService: OrgService,
    public user: UserService,
    public dialog: MatDialog,
  ) {}

  activateOrg(org): void{
    this.activateLoading = true;
    var body = {org_name: org.organization, user_email: this.sharedData.email};
    this.user
    .activateOrg(body)
    .toPromise()
    .then(doc => {
      this.activateLoading = false;
      this.sharedData.activeOrg = org.organization;
      this.sharedData.activeOrgID = org._id;
      location.reload();
    })
    .catch(err => {

    })
  }

  openDialog(org): void {
    this.enrollLoading = true;
    this.orgService
      .getOrgQR(org.organization)
      .toPromise()
      .then(doc => {
        this.enrollLoading = false;
        const dialogRef = this.dialog.open(OrgEnrollDialog, {
          width: "500px",
          data: { name: org.organization, qr_code: doc }
        });
      })
      .catch(err => {});
  }

  ngOnInit() {
    if(this.sharedData.orgCreated){
      location.reload();
      this.sharedData.orgCreated = false;
    }
    this.user
      .getBoardEnrollments(this.sharedData.email)
      .toPromise()
      .then(doc => {
        this.enrollments = doc;
        // console.log(this.enrollments);
        // this.enrollrows = Math.ceil(this.enrollments.length / 3);
        // console.log(this.enrollrows);
        this.orgsLoading = false;

      })
      .catch(err => {});
  }
}
