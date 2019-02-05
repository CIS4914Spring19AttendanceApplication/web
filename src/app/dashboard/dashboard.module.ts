import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { dashboardRoutes } from "./dashboard.routes";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from '../guards/auth-guard.service';
import { OrganizationHomeComponent } from './organization/organization-home/organization-home.component';
import { OrganizationHeaderComponent } from './organization/organization-header/organization-header.component';
import { CreateOrganizationComponent } from './organization/create-organization/create-organization.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';

@NgModule({
  declarations: [LayoutComponent, HomeComponent, ProfileComponent, OrganizationHomeComponent, OrganizationHeaderComponent, CreateOrganizationComponent, ViewProfileComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
  providers: [AuthGuard]
})
export class DashboardModule {}
