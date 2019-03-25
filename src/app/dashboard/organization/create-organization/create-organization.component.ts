import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/shared-data.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { OrgService } from "src/app/api/org.service";
import { Router } from "@angular/router";

@Component({
  selector: "fmyp-create-organization",
  templateUrl: "./create-organization.component.html",
  styleUrls: ["./create-organization.component.css"]
})
export class CreateOrganizationComponent implements OnInit {
  public pointCatBool: boolean = true;
  public pointCats: PointCat[] = new Array<PointCat>();
  public pointName: string;
  public pointValue: number;
  public pCatValError: boolean = false;
  public pointCatForm: any;
  public formBody: any;
  public orgName: string;
  errorDisplay: boolean = false;
  errorMessage: any;
  toggleCat() {
    !this.pointCatBool;
  }

  constructor(
    public sharedData: SharedDataService,
    public orgService: OrgService,
    public router: Router
  ) {}

  ngOnInit() {}

  addCat() {
    this.pointCats.push({ name: this.pointName, value: this.pointValue });
    this.pointName = null;
    this.pointValue = null;
  }

  createOrg() {
    this.formBody = {
      name: this.orgName,
      point_categories: this.pointCats,
      email: this.sharedData.email
    };
    this.orgService
      .createEvent(this.formBody)
      .toPromise()
      .then(response => {
        this.router.navigate(["/dashboard/organizations"]);
      })
      .catch(err => {
        console.log(err);
        if (err.status == 500) {
          this.errorMessage = "Please fill out all fields";
          this.errorDisplay = true;
        } else {
          console.log("not500");
          this.errorDisplay = true;
          this.errorMessage = err.error.message;
        }
      });
  }
}
