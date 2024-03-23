import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveItenary(userId: any,placeId: string[], date: Date, district: string):Observable<any> {
    console.log(userId);
    const data = {userId, district, placeId, date}
    return this.http.post(`${environment.apigatewayUrl}/api-user/user/saveitenary`, data)
  }

  getItenary(userId: any):Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/user/getitenary?userid=${userId}`)
  }

  addGuideToItenary(itenaryId: any, userId:any, guideId: any):Observable<any> {
    const data = {itenaryId, userId, guideId}
    return this.http.post(`${environment.apigatewayUrl}/api-user/user/addguidetoitenary`, data)
  }

  getGuideId(userId: any, itenaryId: string): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/user/getguide?userid=${userId}&itenaryid=${itenaryId}`)
  } 

  cancelTrip(userId: any, itenaryId: string): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/user/canceltrip?userid=${userId}&itenaryid=${itenaryId}`)
  }
}
