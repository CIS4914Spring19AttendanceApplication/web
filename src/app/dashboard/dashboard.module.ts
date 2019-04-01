import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { dashboardRoutes } from "./dashboard.routes";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../guards/auth-guard.service";
import {
  OrganizationHomeComponent,
  OrgEnrollDialog
} from "./organization/organization-home/organization-home.component";
import { CreateOrganizationComponent } from "./organization/create-organization/create-organization.component";
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { FormsModule } from "@angular/forms";
import { EventHomeComponent } from "./event/event-home/event-home.component";
import { CreateEventComponent } from "./event/create-event/create-event.component";
import { ViewEventComponent } from "./event/view-event/view-event.component";
import { MatDialog, MatDialogModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from "@agm/core";
import { ViewEventQrComponent } from './event/view-event-qr/view-event-qr.component';
import { EventAnalyticsComponent } from './analytics/event-analytics/event-analytics.component';
import { AnalyticsHomeComponent } from './analytics/analytics-home/analytics-home.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CreateEventComponent,
    LayoutComponent,
    HomeComponent,
    ProfileComponent,
    OrganizationHomeComponent,
    DashboardHeaderComponent,
    CreateOrganizationComponent,
    ProfileComponent,
    EventHomeComponent,
    ViewEventComponent,
    OrgEnrollDialog,
    ViewEventQrComponent,
    EventAnalyticsComponent,
    AnalyticsHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule,
    GooglePlaceModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBeJeprKc32pOu3u4gcvUCkVV_CEYnqO5Y"
    })
  ],
  providers: [AuthGuard, MatDialog],
  entryComponents: [OrgEnrollDialog]
})
export class DashboardModule {}
