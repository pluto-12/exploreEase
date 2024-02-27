import { Component, Inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlaceService } from 'src/app/service/place/place.service';
declare var google: any;

@Component({
  selector: 'app-addnew-dialog',
  templateUrl: './addnew-dialog.component.html',
  styleUrls: ['./addnew-dialog.component.css'],
})
export class AddnewDialogComponent {
  autoComplete: any;
  latitude: any;
  longitude: any;
  placeName!: string;
  district!: string;
  selectedFile: File | null = null;
  placeForm!: FormGroup;
  formData = new FormData();
  files: string[] = [];
  location: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private zone: NgZone,
    private fb: FormBuilder,
    private placeService: PlaceService,
    public dialogRef: MatDialogRef<AddnewDialogComponent>) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      placeDescription: ['', Validators.required],
      location: ['', Validators.required],
      image: [null, Validators.required],
    });

    this.initAutocomplete();
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.formData.append('file', this.selectedFile, this.selectedFile.name);
  }

  onSubmit() {
    this.location = {
      lattitude: this.latitude,
      longitude: this.longitude,
    };
    console.log('this.location - ', this.location);

    if (this.placeForm.valid) {
      this.formData.append('placeName', this.placeName);
      this.formData.append(
        'placeDescription',
        this.placeForm.value.placeDescription
      );
      this.formData.append('district', this.district);
      this.formData.append('location', JSON.stringify(this.location));
    }

    this.placeService.addNewPlace(this.formData).subscribe((response) => {
      console.log(response);
    });
    this.dialogRef.close()
  }

  initAutocomplete() {
    const locationInput = document.getElementById(
      'location'
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
            console.log('district-', this.district);
          }

          console.log('Selected Place:', this.placeName);
        });
      });
    } else {
      console.error('Location input element not found');
    }
  }
}
