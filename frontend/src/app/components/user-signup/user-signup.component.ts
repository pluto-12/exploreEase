import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../service/auth.service";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  userEmail: string = ""

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      userName: ['', Validators.required],
      userNumber: ['', Validators.required]
      // confirmPassword: ['', Validators.required]
    });
    

  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('name ',this.loginForm.value.userName);
      
      this.authService.addUser(this.loginForm.value.userEmail,this.loginForm.value.userName,this.loginForm.value.userPassword,this.loginForm.value.userNumber).subscribe((response) => {
        console.log(response);
        if(response.success) {
          const navigationExtras: NavigationExtras = {
            queryParams: {'userEmail': response.message.userEmail}
          }
          this.router.navigate(['/user/otpverficaton'], navigationExtras)
        }
      })
      // console.log('Form submitted:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup.get('userPassword')!.value;
  //   const confirmPassword = formGroup.get('confirmPassword')!.value;
  
  //   return password === confirmPassword ? true : { passwordMismatch: false };
  // }

  generateOtp() {

  }


}
