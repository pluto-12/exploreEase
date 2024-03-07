import { Component, NgZone } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { PlaceService } from 'src/app/service/place/place.service';

declare var google: any;

@Component({
  selector: 'app-user-planner',
  templateUrl: './user-planner.component.html',
  styleUrls: ['./user-planner.component.css'],
})
export class UserPlannerComponent {
  itenaryForm!: FormGroup;
  itenaryDistrict!: string;
  itenaryDate!: Date;
  autoComplete: any;
  latitude: any;
  longitude: any;
  district!: string;
  places: any = []

  constructor(private fb: FormBuilder, private zone: NgZone, private placeService: PlaceService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.itenaryForm = this.fb.group({
      itenaryDate: ['', Validators.required],
      itenaryDistrict: ['', Validators.required],
    });
    this.initAutocomplete();
  }

  onSubmit() {
    if (this.itenaryForm.valid) {
      this.itenaryDate = this.itenaryForm.value.itenaryDate;
      console.log(this.itenaryDate, this.itenaryDistrict);
      this.placeService.getPlacesByLocation(this.itenaryDistrict, this.latitude, this.longitude).subscribe((response) => {
        this.places = response.placesWithDistance
      })
    }
  }

  initAutocomplete() {
    const locationInput = document.getElementById(
      'itenaryDistrict'
    ) as HTMLInputElement;

    if (locationInput) {
      this.autoComplete = new google.maps.places.Autocomplete(locationInput, {
        types: ['administrative_area_level_3'],
        componentRestrictions: { country: ['IN'] },
      });

      this.autoComplete.addListener('place_changed', () => {
        this.zone.run(() => {
          const place = this.autoComplete.getPlace();
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          if (place.address_components && place.address_components.length > 0) {
            const districtComponent = place.address_components.find(
              (component: { types: string | string[] }) => {
                return component.types.includes('administrative_area_level_3');
              }
            );
            this.itenaryDistrict = districtComponent
              ? districtComponent.long_name
              : null;
          }
        });
      });
    } else {
      console.error('Location input element not found');
    }
  }
}
