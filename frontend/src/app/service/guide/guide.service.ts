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

  getGuideByPlaceAndDate(district: any, date: any):Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/getguidebyplaceanddate?district=${district}&date=${date}`)
  }

  saveJob(jobData: any, guideId: string):Observable<any> {
    console.log('jobData - ', jobData);
    console.log('guide - ', guideId)
    const data = {jobData, guideId}
    return this.http.post(`${environment.apigatewayUrl}/api-user/guide/savejob`, data)
  }

  getJobs(id: string):Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/getjobs?id=${id}`)
  }

  approveJob(guideId: any, jobId: any):Observable<any> {
    console.log('in service - ', guideId);
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/approvejob?guideid=${guideId}&jobid=${jobId}`)
  }

  guidePayment(data: any):Observable<any> {
    return this.http.post(`${environment.apigatewayUrl}/api-user/user/payment`, data)
  }

  getGuideById(guideId: string): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-user/guide/getguide?guideid=${guideId}`)
  }

}
