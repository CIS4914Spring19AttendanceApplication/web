import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { CallbackComponent } from "./callback/callback.component";
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './api/user.service';
import { AuthService } from './auth/auth.service';
import { SharedDataService } from './shared-data.service';
import { TokenInterceptor } from './token-interceptor.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    CallbackComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(APP_ROUTES), HttpClientModule, DashboardModule],
  providers: [UserService, AuthService, SharedDataService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}