import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/service/place/place.service';

@Component({
  selector: 'app-place-detailed',
  templateUrl: './place-detailed.component.html',
  styleUrls: ['./place-detailed.component.css'],
})
export class PlaceDetailedComponent {
  constructor(private activatedRoute: ActivatedRoute, private placeService: PlaceService) {}
  placeId!: number;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params['id']);
      this.placeId = params['id']
    });
    this.placeService.getPlaceById(this.placeId).subscribe((response) => {
      console.log(response);  
    })
  }
}
