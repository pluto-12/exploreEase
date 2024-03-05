import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment  } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private http: HttpClient) { }

  resetPassword (guideEmail: string, guidePassword: string): Observable<any> {
    const data = {guideEmail, guidePassword}
    return this.http.post(`${environment.apigatewayUrl}/api-user/guide/resetpassword`, data)
  }

  getGuideByPlace(place: string): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/getguidebyplace?place=${place}`)
  }


}
