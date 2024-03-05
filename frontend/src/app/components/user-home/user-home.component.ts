import { Component } from '@angular/core';
import { ExternalService } from 'src/app/service/external/external.service';
import { PlaceService } from 'src/app/service/place/place.service';

import { Store } from '@ngrx/store';
import * as userSelector from "../../store/user/user.selector";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent {
  constructor(private externalService: ExternalService, private placeService: PlaceService, private store: Store) {}

  places: any = []
  latitude!: number 
  longitude!: number
  placeName!: string

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getLocationAndPlace()
    this.store.select(userSelector.selectUserState).subscribe((response) => {
      console.log('from store - ', response.user); 
    })
  }

  getLocationAndPlace() {
    this.externalService.getCurrentPosition().then((position: any) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.externalService.getPlaceName(this.latitude, this.longitude).then(
          (placeName: string) => {
            console.log('User Location:', this.latitude, this.longitude);
            console.log('Place Name:', placeName);
            this.placeService.getPlacesByLocation(placeName, this.latitude, this.longitude).subscribe((response) => {
              console.log(response);
              this.places = response.placesWithDistance
            })
          },
          (error) => {
            console.log('Error fetching place name : ', error);
          }
        );
      }, (error) => {
        console.log('error in fetching cordinates: ', error); 
      });
  }
}
