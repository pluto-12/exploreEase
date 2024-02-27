import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { LandingComponent } from './components/landing/landing.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { CordinatorHomeComponent } from './components/cordinator-home/cordinator-home.component';
import { GuideSignupComponent } from './components/guide-signup/guide-signup.component';
import { authGuard } from './guard/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GuideHomeComponent } from './components/guide-home/guide-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { PlaceDetailedComponent } from './components/place-detailed/place-detailed.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/signup', component: UserSignupComponent},
  {path: 'user/otpverficaton', component: OtpVerificationComponent},
  {path: 'user/home', component: UserHomeComponent, canActivate: [authGuard]},
  {path: 'cordinator/login', component: LoginComponent},
  {path: 'cordinator/home', component: CordinatorHomeComponent, canActivate: [authGuard]},
  {path: 'guide/signup', component: GuideSignupComponent},
  {path: 'guide/login', component: LoginComponent},
  {path: 'guide/resetpassword', component: ResetPasswordComponent},
  {path: 'guide/home', component: GuideHomeComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/home', component: AdminHomeComponent},
  {path: 'user/place', component: PlaceDetailedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
