import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  
  dataSource: String[]= []
  displayedColumns: string[] = ['userEmail', 'userName', 'userNumber', 'action']
  
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.adminService.getAllUsers().subscribe((response) => {
      console.log(response);      
    })
  }

}
