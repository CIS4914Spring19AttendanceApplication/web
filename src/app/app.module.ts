import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { CallbackComponent } from "./callback/callback.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    CallbackComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(APP_ROUTES), HttpModule, FormsModule, FontAwesomeModule, DashboardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}