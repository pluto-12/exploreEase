import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-place-itenary-dialog',
  templateUrl: './place-itenary-dialog.component.html',
  styleUrls: ['./place-itenary-dialog.component.css']
})
export class PlaceItenaryDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PlaceItenaryDialogComponent>) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.data); 
  }
}
