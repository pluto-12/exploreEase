import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuideService } from 'src/app/service/guide/guide.service';
import { Store } from '@ngrx/store';
import * as userSelector from '../../store/user/user.selector';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-show-guides-dialog',
  templateUrl: './show-guides-dialog.component.html',
  styleUrls: ['./show-guides-dialog.component.css'],
})
export class ShowGuidesDialogComponent {
  itenary: any;
  date!: Date;
  guideList: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowGuidesDialogComponent>,
    private guideService: GuideService,
    private store: Store,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.itenary = this.data.itenary;
    this.guideList = this.data.guideList;
    this.date = this.data.date;
    console.log(this.itenary);
  }

  hireGuide(guideId: string) {
    this.store.select(userSelector.selectUserState).subscribe((response) => {
      const userId = response.user?.id;
      const itenaryId = this.itenary._id;
      const jobData = {
        date: this.itenary.date,
        customerId: userId,
        placesId: this.itenary.placesId,
      };
      this.guideService.saveJob(jobData, guideId).subscribe((response) => {
        console.log(response);
        this.userService
          .addGuideToItenary(itenaryId, userId, guideId)
          .subscribe((response) => {
            console.log(response);
          });
        this.dialogRef.close();
      });
    });
  }
}
