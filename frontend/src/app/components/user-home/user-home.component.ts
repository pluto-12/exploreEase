import { Component, NgZone } from '@angular/core';
import { ExternalService } from 'src/app/service/external/external.service';
import { PlaceService } from 'src/app/service/place/place.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as userSelector from '../../store/user/user.selector';

declare var google: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent {
  constructor(
    private externalService: ExternalService,
    private placeService: PlaceService,
    private store: Store,
    private zone: NgZone
  ) {}

  places: any = [];
  latitude!: number;
  longitude!: number;
  placeName!: string;
  searchString!: string;
  autoComplete: any;
  district!: string;
  isInputFocused: boolean = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getLocationAndPlace();
    this.store.select(userSelector.selectUserState).subscribe((response) => {
      console.log('from store - ', response.user);
    });
    this.initAutocomplete();
  }

  getLocationAndPlace() {
    this.externalService.getCurrentPosition().then(
      (position: any) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.externalService.getPlaceName(this.latitude, this.longitude).then(
          (placeName: string) => {
            // console.log('User Location:', this.latitude, this.longitude);
            // console.log('Place Name:', placeName);
            this.placeService
              .getPlacesByLocation(placeName, this.latitude, this.longitude)
              .subscribe((response) => {
                // console.log(response);
                this.places = response.placesWithDistance;
                console.log('places - ', this.places);
                this.places.forEach((place: any) => {
                  this.placeService
                    .getPlaceImageById(place.id)
                    .subscribe((response) => {
                      console.log(response);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        place.placeImage = reader.result as string;
                      };
                      reader.readAsDataURL(response);
                    });
                });
              });
          },
          (error) => {
            console.log('Error fetching place name : ', error);
          }
        );
      },
      (error) => {
        console.log('error in fetching cordinates: ', error);
      }
    );
  }

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  initAutocomplete() {
    const locationInput = document.getElementById(
      'searchText'
    ) as HTMLInputElement;

    if (locationInput) {
      this.autoComplete = new google.maps.places.Autocomplete(locationInput, {
        // types: ['establishment'],
        componentRestrictions: { country: ['IN'] },
        // fields: ['place_id', 'geometry', 'name'],
      });

      this.autoComplete.addListener('place_changed', () => {
        this.zone.run(() => {
          const place = this.autoComplete.getPlace();

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.placeName = place.name;

          if (place.address_components && place.address_components.length > 0) {
            // Extract the district from address components
            const districtComponent = place.address_components.find(
              (component: { types: string | string[] }) => {
                return component.types.includes('administrative_area_level_3');
              }
            );

            this.district = districtComponent
              ? districtComponent.long_name
              : null;
            // console.log('district-', this.district);
          }

          // console.log('Selected Place:', this.placeName);
          this.placeService
            .getPlacesBySearch(
              this.placeName,
              this.district,
              this.latitude,
              this.longitude
            )
            .subscribe((response) => {
              // console.log(response);
              this.places = response.placesWithDistance;
            });
        });
      });
    } else {
      console.error('Location input element not found');
    }
  }
}
