import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CordinatorService } from 'src/app/service/cordinator/cordinator.service';


@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrls: ['./guide-list.component.css']
})
export class GuideListComponent {

  dataSource: String[]= []  
  displayedColumns: string[] = ['guideEmail', 'guideName', 'location', 'action']

  constructor(private cordinatorService: CordinatorService, private router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cordinatorService.getAllGuides().subscribe((response) => {
      console.log(response);
      
      if(response.success) {
        this.dataSource = response.guides
      }
    })
  }

}
