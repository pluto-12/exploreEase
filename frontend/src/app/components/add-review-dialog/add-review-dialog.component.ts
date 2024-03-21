import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as userSelector from '../../store/user/user.selector';
import { PlaceService } from 'src/app/service/place/place.service';


@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.css']
})
export class AddReviewDialogComponent {

  userId: any
  reviewForm!: FormGroup  

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialogRef: MatDialogRef<AddReviewDialogComponent>, private placeService: PlaceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select(userSelector.selectUserState).subscribe((response) => {
      this.userId = response.user?.userEmail
    })
    this.reviewForm = this.fb.group({
      rating: ['', Validators.required],
      review: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const ratingValue = this.reviewForm.get('rating')!.value;
      const reviewValue = this.reviewForm.get('review')!.value;
      this.placeService.addReview(this.userId, this.data, ratingValue, reviewValue).subscribe((response) => {
        console.log(response);
        this.dialogRef.close()
      })
    }
  }
}
