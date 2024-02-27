import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CordinatorService {

  constructor(private http: HttpClient) { }

  getGuideReq():Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/getguiderequest`)
  }

  approveGuide(guideEmail: string): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/approveguide?guideemail=${guideEmail}`)
  }

  getAllGuides(): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/getallguides`)
  }

  getCordinatorImage(guideEmail: string): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/getguideimage?guideemail=${guideEmail}`, {responseType: 'blob'})
  }


}
