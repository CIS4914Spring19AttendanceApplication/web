import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { SharedDataService } from "./shared-data.service";



@Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(public sharedData: SharedDataService) {}
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     request = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${this.sharedData.accessToken}`
//       }
//     });
//     return next.handle(request);
//   }
// }

export class TokenInterceptor implements HttpInterceptor {
  constructor(private sharedData: SharedDataService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sharedData.accessToken}`,
      'Access-Control-Allow-Origin': '*'
    });


    const cloneReq = req.clone({headers});

    return next.handle(cloneReq);
  }
}