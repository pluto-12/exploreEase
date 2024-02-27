import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuideService } from 'src/app/service/guide/guide.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  guideEmail: string = ""
  resetForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private guideService:  GuideService, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.guideEmail = this.route.snapshot.queryParams['userEmail']
    this.resetForm = this.fb.group({
      guidePassword: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.resetForm.valid) {
      const guidePassword = this.resetForm.value.guidePassword
      this.guideService.resetPassword(this.guideEmail, guidePassword).subscribe((response) => {
        if(response.success) {
          this.router.navigateByUrl('/guide/home')
        }
      })

    }
  }
}
