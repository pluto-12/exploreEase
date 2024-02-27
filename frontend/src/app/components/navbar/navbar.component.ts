import { Component, importProvidersFrom } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}
  role: string = ""
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const currentUrl = this.router.url
    if(currentUrl.startsWith('/user')) {
      this.role = "user"
    } else if (currentUrl.startsWith('/cordinator')) {
      this.role = "cordinator"
    } else if (currentUrl.startsWith('/admin')) {
      this.role = "admin"
    }
  }


  logout() {
    localStorage.clear()
    this.router.navigateByUrl('')
  }
}
