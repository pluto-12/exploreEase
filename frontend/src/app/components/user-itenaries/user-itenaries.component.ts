import { Component } from '@angular/core';
import { PlaceService } from 'src/app/service/place/place.service';
import { UserService } from 'src/app/service/user/user.service';
import { Store } from '@ngrx/store';
import * as userSelector from '../../store/user/user.selector';
import { MatDialog } from '@angular/material/dialog';
import { PlaceItenaryDialogComponent } from '../place-itenary-dialog/place-itenary-dialog.component';
import { GuideService } from 'src/app/service/guide/guide.service';
import { ShowGuidesDialogComponent } from '../show-guides-dialog/show-guides-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-itenaries',
  templateUrl: './user-itenaries.component.html',
  styleUrls: ['./user-itenaries.component.css'],
})
export class UserItenariesComponent {
  placeId!: [string];
  itenaries: any;

  constructor(
    private userService: UserService,
    private placeService: PlaceService,
    private store: Store,
    private dialog: MatDialog,
    private guideService: GuideService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getItenaries();
  }

  getItenaries() {
    this.store.select(userSelector.selectUserState).subscribe((response) => {
      const id = response.user?.id;
      this.userService.getItenary(id).subscribe((response) => {
        // console.log(response.itenaryDetails);
        this.itenaries = response.itenaryDetails;
        this.itenaries.forEach((element: any) => {
          element.formattedDate = new Date(element.date)
            .toISOString()
            .split('T')[0];
          element.placesCount = element.placesId.length;
        });
        console.log(this.itenaries);
      });
    });
  }

  showItenaryPlaces(itenaryId: string) {
    const placeIds: string[] = [];
    this.itenaries.forEach((itenary: any) => {
      if (itenary._id === itenaryId) {
        itenary.placesId.forEach((placeId: string) => {
          placeIds.push(placeId);
        });
      }
    });
    console.log(placeIds);
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

  hireGuide(itenaryId: string) {
    let district;
    let date: any;
    let itenary: any;
    this.itenaries.forEach((element: any) => {
      if (element._id === itenaryId) {
        district = element.district;
        date = element.date;
        itenary = element;
      }
    });
    this.guideService
      .getGuideByPlaceAndDate(district, date)
      .subscribe((response) => {
        const dialogRef = this.dialog.open(ShowGuidesDialogComponent, {
          width: '500px',
          data: { guideList: response.guides, itenary, date },
        });
        dialogRef.afterClosed().subscribe((response) => {
          this.getItenaries();
        });
      });
  }

  isPastDate(date: string): boolean {
    const formattedDate = new Date(date);
    const today = new Date();
    return formattedDate < today;
}

  chat(itenaryId: string) {
    console.log(itenaryId);
    this.router.navigate(['/user/chat'], {queryParams: {id: itenaryId}});
  }
}
