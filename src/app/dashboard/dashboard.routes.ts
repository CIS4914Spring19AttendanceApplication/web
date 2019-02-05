import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../guards/auth-guard.service";
import { OrganizationHomeComponent } from "./organization/organization-home/organization-home.component";
import { CreateOrganizationComponent } from "./organization/create-organization/create-organization.component";

export const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: HomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "organizations", component: OrganizationHomeComponent },
      { path: "organizations/create", component: CreateOrganizationComponent }
    ]
  }
];
