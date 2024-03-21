import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getAllPlaces(): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-places/place/showallplaces`)
  }

  getPlacesByLocation(district: string, lattitude: number, longitude: number): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-places/place/showplaces?district=${district}&lattitude=${lattitude}&longitude=${longitude}`)
  }

  addNewPlace(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    // console.log('here');
    return this.http.post(`${environment.apigatewayUrl}/api-places/place/addplace`, formData, {headers})
  }

  getPlaceById(id: number): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-places/place/getplacedetails?id=${id}`)
  }

  getPlaceImageById(id: number): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-places/place/getplaceimage?id=${id}`, {responseType: 'blob'})
  }

  getPlacesBySearch(placeName: string, district: string, lattitude: number, longitude: number): Observable<any> {
    return this.http.get(`${environment.apigatewayUrl}/api-places/place/search?placename=${placeName}&district=${district}&lattitude=${lattitude}&longitude=${longitude}`)
  }

  getPlaceDetailsByMultipleId(placesId: string[]):Observable<any> {
    return this.http.post(`${environment.apigatewayUrl}/api-places/place/getplacebyid`, placesId)
  }

  addReview(userId: string,placeId: string, rating: number, review: string): Observable<any> {
    const data = {userId, placeId,  rating, review}
    return this.http.post(`${environment.apigatewayUrl}/api-places/place/addreview`, data)
  }
}
