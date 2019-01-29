import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


