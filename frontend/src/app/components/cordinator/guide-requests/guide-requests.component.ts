import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CordinatorService } from 'src/app/service/cordinator/cordinator.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';

@Component({
  selector: 'app-guide-requests',
  templateUrl: './guide-requests.component.html',
  styleUrls: ['./guide-requests.component.css'],
})
export class GuideRequestsComponent {
  dataSource: string[] = [];
  displayedColumns: string[] = [
    'guideEmail',
    'guideName',
    'location',
    'action',
  ];
  imageSrc: any;

  constructor(
    private cordinatorService: CordinatorService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cordinatorService.getGuideReq().subscribe((response) => {
      // console.log(response);
      this.dataSource = response.guideRequests;
    });
  }

  approve(guideEmail: string) {
    console.log(guideEmail);
    this.cordinatorService.approveGuide(guideEmail).subscribe((response) => {
      if (response.success) {
        this.cordinatorService.getGuideReq().subscribe((response) => {
          // console.log(response);
          this.dataSource = response.guideRequests;
        });
      }
    });
  }

  openInfoDialog(guideEmail: string) {
    this.cordinatorService
      .getCordinatorImage(guideEmail)
      .subscribe((response) => {
        console.log(response);
        const reader = new FileReader();
        // reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.imageSrc = reader.result as String;
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '500px',
            data: this.imageSrc,
          });
        };
        reader.readAsDataURL(response)
      });
    
  }
}
