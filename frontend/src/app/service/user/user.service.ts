import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveItenary(userId: any,placeId: string[], date: Date):Observable<any> {
    console.log(userId);
    const data = {userId, placeId, date}
    return this.http.post(`${environment.apigatewayUrl}/api-user/user/saveitenary`, data)
  }
}
