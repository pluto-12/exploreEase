import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';

declare var google: any;

@Component({
  selector: 'app-guide-signup',
  templateUrl: './guide-signup.component.html',
  styleUrls: ['./guide-signup.component.css'],
})
export class GuideSignupComponent {
  signupForm!: FormGroup;
  autoComplete: any;
  matDialog: boolean = false;
  selectedFile: File | null = null;
  formData = new FormData();
  files: string[] = [];
  latitude: any;
  longitude: any;
  placeName!: string;
  district!: string;

  constructor(
    private fb: FormBuilder,
    private zone: NgZone,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      guideName: ['', Validators.required],
      guideEmail: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      location: ['', Validators.required],
      idCard: [null, Validators.required],
    });

    this.initAutocomplete();
    this.matDialog = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log('selecteed file', this.selectedFile);
    this.formData.append('file', this.selectedFile, this.selectedFile.name);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const guideEmail = this.signupForm.value.guideEmail;
      const guideName = this.signupForm.value.guideName;
      const dateOfBirth = this.signupForm.value.dateOfBirth;

      const location = {
        placeName: this.placeName,
        latitude: this.latitude,
        longitude: this.longitude,
        district: this.district,
      };
      console.log(guideEmail, guideName, dateOfBirth, location);

      this.formData.append('guideName', guideName);
      this.formData.append('guideEmail', guideEmail);
      this.formData.append('dateOfBirth', dateOfBirth);
      this.formData.append('location', JSON.stringify(location));
      console.log(this.formData);

      this.authService.requestGuide(this.formData).subscribe((response) => {
        console.log(response);
        if (response.success) {
          this.matDialog = true;
        }
      });
    }
  }

  initAutocomplete() {
    const locationInput = document.getElementById(
      'location'
    ) as HTMLInputElement;

    if (locationInput) {
      this.autoComplete = new google.maps.places.Autocomplete(locationInput, {
        types: ['administrative_area_level_3'],
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
            console.log('district-', this.district);
          }

          console.log('Selected Place:', place);
        });
      });
    } else {
      console.error('Location input element not found');
    }
  }
}
