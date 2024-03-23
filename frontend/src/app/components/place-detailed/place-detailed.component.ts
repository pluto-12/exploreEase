import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuideService } from 'src/app/service/guide/guide.service';
import { PlaceService } from 'src/app/service/place/place.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewDialogComponent } from '../add-review-dialog/add-review-dialog.component';

@Component({
  selector: 'app-place-detailed',
  templateUrl: './place-detailed.component.html',
  styleUrls: ['./place-detailed.component.css'],
})
export class PlaceDetailedComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlaceService,
    private guideService: GuideService,
    private dialog: MatDialog
  ) {}
  placeId!: number;
  placeImages: any = [];
  placeDetails!: any;
  guideDetails!: any;
  reviews!: any;
  totalReviews!: number;
  averageRating!: number;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params['id']);
      this.placeId = params['id'];
    });
    this.placeService.getPlaceById(this.placeId).subscribe((response) => {
      // console.log(response);
      this.placeDetails = response.place;
      // console.log('place - ', this.placeDetails);
      this.guideService
        .getGuideByPlace(this.placeDetails.district)
        .subscribe((response) => {
          this.guideDetails = response.guideList;
          // console.log(this.guideDetails);
        });
    });
    this.placeService.getPlaceImageById(this.placeId).subscribe((response) => {
      console.log(response);
      const reader = new FileReader();
      reader.onloadend = () => {
        this.placeImages = reader.result as string;
      };
      reader.readAsDataURL(response);
    });
    this.placeService.getReviews(this.placeId).subscribe((response) => {
      // console.log(response);
      this.totalReviews = response.totalReviews;
      this.averageRating = response.averageRating;
      this.reviews = response.reviews;
      console.log(
        'here - ',
        this.reviews,
        this.averageRating,
        this.totalReviews
      );
    });
  }

  addReviews() {
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      width: '500px',
      data: this.placeId,
    });
    dialogRef.afterClosed().subscribe((response) => {});
  }
}
