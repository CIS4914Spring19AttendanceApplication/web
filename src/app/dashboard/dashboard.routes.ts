import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../guards/auth-guard.service";
import { OrganizationHomeComponent } from "./organization/organization-home/organization-home.component";
import { CreateOrganizationComponent } from "./organization/create-organization/create-organization.component";
import { EventHomeComponent } from "./event/event-home/event-home.component";
import { CreateEventComponent } from "./event/create-event/create-event.component";
import { ViewEventComponent } from "./event/view-event/view-event.component";
import { EventAnalyticsComponent } from './analytics/event-analytics/event-analytics.component';
import { EventAnalyticsHomeComponent } from './analytics/event-analytics-home/event-analytics-home.component';
import { MemberAnalyticsHomeComponent } from './analytics/member-analytics-home/member-analytics-home.component';
import { MemberAnalyticsComponent } from './analytics/member-analytics/member-analytics.component';

export const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: EventHomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "organizations", component: OrganizationHomeComponent },
      { path: "organizations/create", component: CreateOrganizationComponent },
      { path: "events", component: EventHomeComponent },
      { path: "events/create", component: CreateEventComponent },
      { path: "events/view/:id", component: ViewEventComponent },
      { path: "events/create", component: CreateEventComponent },
      {path: "analytics/event", component: EventAnalyticsHomeComponent},
      {path: "analytics/member", component: MemberAnalyticsHomeComponent},
      {path: "analytics/member/:id", component: MemberAnalyticsComponent},

      {path: "analytics/event/:id", component: EventAnalyticsComponent}

    ]
  }
];
