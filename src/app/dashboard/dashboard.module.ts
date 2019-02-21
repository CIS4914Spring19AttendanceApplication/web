import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { dashboardRoutes } from "./dashboard.routes";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from '../guards/auth-guard.service';
import { OrganizationHomeComponent } from './organization/organization-home/organization-home.component';
import { CreateOrganizationComponent } from './organization/create-organization/create-organization.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, HomeComponent, ProfileComponent, OrganizationHomeComponent, DashboardHeaderComponent, CreateOrganizationComponent, ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes), FormsModule],
  providers: [AuthGuard]
})
export class DashboardModule {}
