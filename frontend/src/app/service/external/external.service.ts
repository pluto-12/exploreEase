import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class ExternalService {
  constructor() {}

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  getPlaceName(latitude: number, longitude: number): Promise<string> {
    return new Promise((resole, reject) => {
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
            resole(district);
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  }
}
