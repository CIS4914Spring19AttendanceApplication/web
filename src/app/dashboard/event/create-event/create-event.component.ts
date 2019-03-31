import { Component, OnInit } from "@angular/core";
import { SharedDataService } from "src/app/shared-data.service";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { OrgService } from "src/app/api/org.service";
import { AgmCircle } from "@agm/core";
import { EventService } from "src/app/api/event.service";

class PointCatEvent {
  name: string;
  
}

class AdditionalQuestions {
  question: string;
}

@Component({
  selector: "fmyp-create-event",
  templateUrl: "./create-event.component.html",
  styleUrls: ["./create-event.component.css"]
})
export class CreateEventComponent implements OnInit {
  public name: any;
  public location: string;
  public time: any;
  public categories: any;
  public date: any;
  public meridian = true;
  public currentTime: any;
  public minutes: Number;
  public questionsBool = false;
  public questions: AdditionalQuestions[] = new Array<AdditionalQuestions>();
  public question: string;
  public checkin = true;
  public locationenforce = false;
  public pointCats: PointCatEvent[] = new Array<PointCatEvent>();
  //public options = { types: ['geocode'] };
  lat: any;
  lng: any;
  center: any;
  agmMap: any;
  radiusMeters: any;
  radius: any = 0.0473485;
  formBody: any;
  selectedCategories: [];
  spinners: false;
  location_address: String;

  constructor(
    public sharedData: SharedDataService,
    private calendar: NgbCalendar,
    private orgService: OrgService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.date = this.calendar.getToday();
    this.currentTime = new Date();
    this.minutes =
      ((((this.currentTime.getMinutes() + 7.5) / 15) | 0) * 15) % 60;
    this.time = {
      hour: this.currentTime.getHours(),
      minute: this.minutes,
      spinners: false
    };


    this.orgService
      .getPointCategories(this.sharedData.activeOrg)
      .toPromise()
      .then(doc => {
        this.categories = doc;
      })
      .catch(err => {});
  }

  addQuestion() {
    if (this.question != null) {
      this.questions.push({ question: this.question });
      this.question = null;
    }
    console.log(this.questions);
  }

  toggleQuestions() {
    !this.questionsBool;
  }

  toggleAttendance() {
    this.checkin = !this.checkin;
  }

  enforceLocation() {
    this.locationenforce = !this.locationenforce;
    console.log(this.lat);
    console.log(this.lng);
  }

  clearSelections() {
    this.selectedCategories = [];
  }

  removeQuestion(currentQuestion) {
    this.questions.splice(this.questions.indexOf(currentQuestion), 1);
  }

  createEvent() {
    // this.dateObj = Date.parse(this.date.year + "-" + this.date.month + "-" + this.date.day)
    console.log(this.date.day);
    console.log(this.time.hour);
    console.log(this.time.minute);
    console.log(this.date.month);
    console.log(this.date.year);

    var dateObj = new Date(
      this.date.year,
      this.date.month,
      this.date.day,
      this.time.hour,
      this.time.minute,
      0,
      0
    );
    console.log(dateObj.toTimeString());

    for (var cat of this.selectedCategories) {
      this.pointCats.push({ name: cat });
    }

    this.formBody = {
      name: this.name,
      org_id: this.sharedData.activeOrgID,
      date: dateObj,
      categories: this.categories,
      questionsBool: this.questionsBool,
      questions: this.questions,
      checkin: this.checkin,
      location_enforce: this.locationenforce,
      location_lat: this.lat,
      location_lng: this.lng,
      location: this.location,
      location_address: this.location_address,
      location_radius: this.radiusMeters,
      org_name: this.sharedData.activeOrg,
      point_categories: this.pointCats,
      created_by: this.sharedData.email,
      additional_fields: this.questions,
      attendance_toggle: this.checkin
    };

    this.eventService
      .createEvent(this.formBody)
      .toPromise()
      .then(document => {
        console.log(document);
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectToday() {
    this.date = this.calendar.getToday();
    console.log(this.date);
  }

  public handleAddressChange(address) {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    this.center = this.lat + ", " + this.lng;
    this.radiusMeters = this.radius * 1609.344;
    this.location = address.name;
    this.location_address = address.formatted_address;
  }

  public handleRadiusChange(newRadius) {
    this.lat = this.lat;
    this.lng = this.lng;
    this.radius = newRadius;
    this.radiusMeters = this.radius * 1609.344;
  }
}
