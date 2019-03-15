import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { dashboardRoutes } from "./dashboard.routes";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from '../guards/auth-guard.service';
import { OrganizationHomeComponent, OrgEnrollDialog } from './organization/organization-home/organization-home.component';
import { CreateOrganizationComponent } from './organization/create-organization/create-organization.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { FormsModule } from '@angular/forms';
import { EventHomeComponent } from './event/event-home/event-home.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { ViewEventComponent } from './event/view-event/view-event.component';
import { MatDialog, MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [LayoutComponent, HomeComponent, ProfileComponent, OrganizationHomeComponent, DashboardHeaderComponent, CreateOrganizationComponent, ProfileComponent, EventHomeComponent, CreateEventComponent, ViewEventComponent, OrgEnrollDialog],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes), FormsModule, MatDialogModule, BrowserAnimationsModule],
  providers: [AuthGuard, MatDialog],
  entryComponents: [OrgEnrollDialog]
})
export class DashboardModule {}
