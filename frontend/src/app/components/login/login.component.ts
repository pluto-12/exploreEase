import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/service/auth.service';
import * as userSelector from '../../store/user/user.selector';
import * as UserActions from '../../store/user/user.actions';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  currentUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}
  ngOnInit() {
    const currentUrl = this.router.url;
    // console.log(currentUrl)
    if (currentUrl == '/user/login') {
      google.accounts.id.initialize({
        client_id:
          '733436264602-066te3maai7abfs2ch60v5qjc9rdhnug.apps.googleusercontent.com',
        callback: (response: any) => {
          console.log(response);
          this.googlesignin(response.credential);
        },
      });

      google.accounts.id.renderButton(document.getElementById('google-btn'), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 150,
      });
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userEmail = this.loginForm.value.email;
      const userPassword = this.loginForm.value.password;
      this.currentUrl = this.router.url;
      // console.log(this.currentUrl);
      if (this.currentUrl == '/user/login') {
        this.authService
          .verifyUser(userEmail, userPassword)
          .subscribe((response) => {
            // console.log('user login data - ', response.user);
            if (response.success) {
              const user = {
                id: response.user._id,
                userEmail: response.user.userEmail,
                userName: response.user.userName,
                userNumber: response.user.userNumber,
              };
              this.store.dispatch(UserActions.addUser({ user: user }));
              localStorage.setItem('jwt', response.token);
              this.router.navigateByUrl('/user/home');
            }
          });
      } else if (this.currentUrl == '/cordinator/login') {
        // console.log('here');
        this.authService
          .verifyCordinator(userEmail, userPassword)
          .subscribe((response) => {
            console.log(response);
            if (response.success) {
              localStorage.setItem('jwt', response.token);
              this.router.navigateByUrl('/cordinator/home');
            }
          });
      } else if (this.currentUrl == '/guide/login') {
        this.authService
          .verifyGuide(userEmail, userPassword)
          .subscribe((response) => {
            console.log(response);

            if (response.success) {
              localStorage.setItem('jwt', response.token);
              if (response.user.passwordFlag) {
                this.router.navigateByUrl('/guide/home');
              } else {
                const navigationExtras: NavigationExtras = {
                  queryParams: { userEmail: userEmail },
                };
                this.router.navigate(
                  ['/guide/resetpassword'],
                  navigationExtras
                );
              }
            }
          });
      } else if (this.currentUrl == '/admin/login') {
        this.authService
          .verifyAdmin(userEmail, userPassword)
          .subscribe((response) => {
            console.log(response);
            if (response.success) {
              localStorage.setItem('jwt', response.token);
              this.router.navigateByUrl('/admin/home');
            }
          });
      }
    } else {
      // Mark form controls as touched to display validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  googlesignin(token: string) {
    // console.log(token);
    this.authService.googlesignin(token).subscribe((response) => {
      console.log(response);
      if (response.success) {
        localStorage.setItem('jwt', response.token);
        this.router.navigateByUrl('/user/home');
      }
    });
  }
}
