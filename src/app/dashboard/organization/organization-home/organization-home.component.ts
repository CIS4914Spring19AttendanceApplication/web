import { Component, OnInit, Inject } from '@angular/core';
import { SharedDataService } from 'src/app/shared-data.service';
import { UserService } from 'src/app/api/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { OrgService } from 'src/app/api/org.service';

export interface OrgEnrollData {
  name: string;
  qr_code: string;
}

@Component({
  selector: 'org-enroll-dialog',
  templateUrl: 'org-enroll-dialog.html',
})
export class OrgEnrollDialog {
  constructor(
    public dialogRef: MatDialogRef<OrgEnrollDialog>,
    @Inject(MAT_DIALOG_DATA) public data: OrgEnrollData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'fmyp-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css']
})
export class OrganizationHomeComponent implements OnInit {

  public enrollments: any;
  public enrollrows: Number;
  public qr_code: string;
  constructor(public sharedData: SharedDataService, public orgService: OrgService, public user: UserService, public dialog: MatDialog) { }

   openDialog(org): void {

    this.orgService.getOrgQR(org.organization)
    .toPromise()
    .then(doc => {
      console.log(doc);
      const dialogRef = this.dialog.open(OrgEnrollDialog, {
        width: '500px',
        data: {name: org.organization, qr_code: doc}
      });
      
    })
    .catch(err => {

    });

  
  }



  ngOnInit() {
    this.user.getEnrollments(this.sharedData.email)
    .toPromise()
    .then(doc => {
      this.enrollments = doc;
      console.log(this.enrollments);
      this.enrollrows = Math.ceil(this.enrollments.length / 3);
      console.log(this.enrollrows);
      
    })
    .catch(err => {

    });
    
    
  }

}
