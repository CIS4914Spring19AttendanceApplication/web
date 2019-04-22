import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
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
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from "@agm/core";
import { ViewEventQrComponent } from './event/view-event-qr/view-event-qr.component';
import { EventAnalyticsComponent } from './analytics/event-analytics/event-analytics.component';
import { EventAnalyticsHomeComponent } from './analytics/event-analytics-home/event-analytics-home.component';
import { ChartsModule } from 'ng2-charts';
import { MemberAnalyticsHomeComponent } from './analytics/member-analytics-home/member-analytics-home.component';
import { MemberAnalyticsComponent } from './analytics/member-analytics/member-analytics.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { RefreshComponent } from './organization/refresh/refresh.component';

@NgModule({
  declarations: [
    CreateEventComponent,
    LayoutComponent,
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
    EventAnalyticsHomeComponent,
    MemberAnalyticsHomeComponent,
    MemberAnalyticsComponent,
    RefreshComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    FormsModule,
    MatDialogModule,
    NgbModule,
    BrowserAnimationsModule,
    NgbModule,
    GooglePlaceModule,
    PDFExportModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBeJeprKc32pOu3u4gcvUCkVV_CEYnqO5Y"
    })
  ],
  providers: [AuthGuard, MatDialog],
  entryComponents: [OrgEnrollDialog]
})
export class DashboardModule {}
