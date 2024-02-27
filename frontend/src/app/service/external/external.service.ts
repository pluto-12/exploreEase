import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class ExternalService {
  constructor() {}

  getCurrentPosition(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            observer.next(position);
            observer.complete();
          },
          (error: any) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('geolocation not supported');
      }
    });
  }

  getPlaceName(latitude: number, longitude: number): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: latitude, lng: longitude };
      let district: string;
      geocoder.geocode({ location: latlng }, (result: any, status: any) => {
        if (status == 'OK') {
          if (result) {
            console.log(result);
            result.forEach((element: any) => {
              element.address_components.forEach((component: any) => {
                if (component.types.includes('administrative_area_level_3')) {
                  district = component.long_name;
                }
              });
            });
            // console.log(district);
            observer.next(district)
            // observer.next(result[0].formatted_address);
            observer.complete();
          }
        } else {
          observer.error('Geocoder failed due to: ' + status);
        }
      });
    });
  }
}
