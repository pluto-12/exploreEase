import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import {
  userLoginResponse,
  CordinatorLoginResponse,
  GuideLoginResponse,
  GoogleUserSinginResponse,
} from '../interfaces/login.interface';
import {
  OtpResponse,
  UserSignupResponse,
} from '../interfaces/signup.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  addUser(
    userEmail: string,
    userName: string,
    userPassword: string,
    userNumber: string
  ): Observable<UserSignupResponse> {
    const newUserData = { userEmail, userName, userPassword, userNumber };
    // console.log(newUserData);
    console.log(`${environment.apigatewayUrl}/api-user/user/adduser`);
    return this.http.post<UserSignupResponse>(
      `${environment.apigatewayUrl}/api-user/user/adduser`,
      newUserData
    );
  }

  sendOtp(otp: string, email: string): Observable<OtpResponse> {
    const data = { otp, email };
    // console.log(data);
    return this.http.post<OtpResponse>(
      `${environment.apigatewayUrl}/api-otp/sendmail`,
      data
    );
  }

  verifyEmail(userEmail: string): Observable<OtpResponse> {
    return this.http.get<OtpResponse>(
      `${environment.apigatewayUrl}/api-user/user/verifymail?email=${userEmail}`
    );
  }

  verifyUser(
    userEmail: string,
    userPassword: string
  ): Observable<userLoginResponse> {
    const credentials = { userEmail, userPassword };
    return this.http.post<userLoginResponse>(
      `${environment.apigatewayUrl}/api-user/user/verifylogin`,
      credentials
    );
  }

  verifyCordinator(
    cordinatorEmail: string,
    cordinatorPassword: string
  ): Observable<CordinatorLoginResponse> {
    const credentials = { cordinatorEmail, cordinatorPassword };
    return this.http.post<CordinatorLoginResponse>(
      `${environment.apigatewayUrl}/api-user/cordinator/verifylogin`,
      credentials
    );
  }

  googlesignin(token: string): Observable<GoogleUserSinginResponse> {
    const userDetails = { token };
    return this.http.post<GoogleUserSinginResponse>(
      `${environment.apigatewayUrl}/api-user/user/googlesignin`,
      userDetails
    );
  }

  requestGuide(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    console.log('here');
    return this.http.post(
      `${environment.apigatewayUrl}/api-user/guide/addguide`,
      // 'http://localhost:3001/guide/addguide',
      formData,
      {headers}
    );
  }

  verifyGuide(
    guideEmail: string,
    guidePassword: string
  ): Observable<GuideLoginResponse> {
    const data = { guideEmail, guidePassword };
    // console.log(guideEmail, guidePassword);
    return this.http.post<GuideLoginResponse>(
      `${environment.apigatewayUrl}/api-user/guide/verifylogin`,
      data
    );
  }

  verifyAdmin(adminEmail: string, adminPassword: string): Observable<any> {
    const credentials = { adminEmail, adminPassword };
    return this.http.post(
      `${environment.apigatewayUrl}/api-user/admin/verifylogin`,
      credentials
    );
  }
}
