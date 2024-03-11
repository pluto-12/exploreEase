import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GuideService } from 'src/app/service/guide/guide.service';
import { Store } from '@ngrx/store';
import * as guideSelector from '../../../store/guide/guide.selector';
import { PlaceService } from 'src/app/service/place/place.service';
import { PlaceItenaryDialogComponent } from '../../place-itenary-dialog/place-itenary-dialog.component';



@Component({
  selector: 'app-guide-jobrequests',
  templateUrl: './guide-jobrequests.component.html',
  styleUrls: ['./guide-jobrequests.component.css']
})
export class GuideJobrequestsComponent {

  dataSource: string[] = [];
  displayedColumns: string[] = [
    'date',
    'customerId',
    'placeCount',
    'action',
  ];

  constructor(private guideService: GuideService, private store: Store, private placeService: PlaceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select(guideSelector.selectGuideState).subscribe((response) => {
      console.log(response);
      const id = response.guide?.id
      this.getJobRequests(id)
    })
  }

  getJobRequests(id: any) {
    this.guideService.getJobsRequests(id).subscribe((response) => {
      this.dataSource = response.jobRequests
    })
  }

  approve(jobId: string) {
    this.store.select(guideSelector.selectGuideState).subscribe((response) => {
      // console.log(response);
      const guideId = response.guide?.id
      this.guideService.approveJob(guideId, jobId).subscribe((response) => {
        this.getJobRequests(guideId)
      })
    })
  }

  showPlaces(id: string) {
    const placeIds: string[] = [];
    this.dataSource.forEach((element: any) => {
      if(element._id == id) {
        element.placesId.forEach((place: any) => {
          placeIds.push(place)
        })
      }
    })
    this.placeService
      .getPlaceDetailsByMultipleId(placeIds)
      .subscribe((response) => {
        console.log(response);
        const dialogRef = this.dialog.open(PlaceItenaryDialogComponent, {
          width: '500px',
          data: response.placeList,
        });
      });
  }

}
