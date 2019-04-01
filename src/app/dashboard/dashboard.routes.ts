import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../guards/auth-guard.service";
import { OrganizationHomeComponent } from "./organization/organization-home/organization-home.component";
import { CreateOrganizationComponent } from "./organization/create-organization/create-organization.component";
import { EventHomeComponent } from "./event/event-home/event-home.component";
import { CreateEventComponent } from "./event/create-event/create-event.component";
import { ViewEventComponent } from "./event/view-event/view-event.component";
import { EventAnalyticsComponent } from './analytics/event-analytics/event-analytics.component';

export const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: HomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "organizations", component: OrganizationHomeComponent },
      { path: "organizations/create", component: CreateOrganizationComponent },
      { path: "events", component: EventHomeComponent },
      { path: "events/create", component: CreateEventComponent },
      { path: "events/view/:id", component: ViewEventComponent },
      { path: "events/create", component: CreateEventComponent },
      {path: "analytics/event/:id", component: EventAnalyticsComponent}

    ]
  }
];
