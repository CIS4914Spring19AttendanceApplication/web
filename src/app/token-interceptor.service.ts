import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { SharedDataService } from "./shared-data.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public sharedData: SharedDataService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.sharedData.accessToken}`
      }
    });
    return next.handle(request);
  }
}
