import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from 'src/app/service/place/place.service';
import { MatDialog } from '@angular/material/dialog';
import { AddnewDialogComponent } from '../../addnew-dialog/addnew-dialog.component';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
})
export class PlaceListComponent {
  dataSource: string[] = [];
  displayedColumns: string[] = [
    'placeName',
    'placeDescription',
    'district',
    'action',
  ];
  imageSrc: any

  constructor(
    private placeService: PlaceService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.placeService.getAllPlaces().subscribe((response) => {
      if (response.success) {
        this.dataSource = response.placeList;
      }
    });
  }

  openAddPlaceDialog() {
    const dialogRef = this.dialog.open(AddnewDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.placeService.getAllPlaces().subscribe((response) => {
        if (response.success) {
          this.dataSource = response.placeList;
        }
      });
    });
  }

  openInfoDialog(id: number) {
    this.placeService.getPlaceImageById(id).subscribe((response) => {
      const reader = new FileReader();
        // reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.imageSrc = reader.result as String;
          const dialogRef = this.dialog.open(InfoDialogComponent, {
            width: '1000px',
            data: this.imageSrc,
          });
        };
        reader.readAsDataURL(response)
    })   
  }
}
