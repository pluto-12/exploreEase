import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { CordinatorHomeComponent } from './components/cordinator/cordinator-home/cordinator-home.component';
import { GuideSignupComponent } from './components/guide-signup/guide-signup.component';
import { authGuard } from './guard/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GuideHomeComponent } from './components/guide-home/guide-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { PlaceDetailedComponent } from './components/place-detailed/place-detailed.component';
import { PlaceListComponent } from './components/cordinator/place-list/place-list.component';
import { GuideListComponent } from './components/cordinator/guide-list/guide-list.component';
import { GuideRequestsComponent } from './components/cordinator/guide-requests/guide-requests.component';
import { UserPlannerComponent } from './components/user-planner/user-planner.component';
import { UserItenariesComponent } from './components/user-itenaries/user-itenaries.component';
import { UserItenariesDetailedComponent } from './components/user-itenaries-detailed/user-itenaries-detailed.component';
import { GuideComponent } from './components/guide/guide.component';
import { GuideProfileComponent } from './components/guide/guide-profile/guide-profile.component';
import { GuideReviewsComponent } from './components/guide/guide-reviews/guide-reviews.component';
import { GuideJobsComponent } from './components/guide/guide-jobs/guide-jobs.component';
import { GuideJobrequestsComponent } from './components/guide/guide-jobrequests/guide-jobrequests.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/signup', component: UserSignupComponent },
  { path: 'user/otpverficaton', component: OtpVerificationComponent },
  { path: 'user/home', component: UserHomeComponent, canActivate: [authGuard] },
  { path: 'cordinator/login', component: LoginComponent },
  {
    path: 'cordinator/home',
    component: CordinatorHomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'places', pathMatch: 'full' },
      { path: 'places', component: PlaceListComponent },
      { path: 'guides', component: GuideListComponent },
      { path: 'guiderequests', component: GuideRequestsComponent },
    ],
  },
  {
    path: 'guide/home',
    component: GuideComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'profile', component: GuideProfileComponent},
      { path: 'reviews', component: GuideReviewsComponent},
      { path: 'job', component: GuideJobsComponent}, 
      { path: 'jobrequests', component: GuideJobrequestsComponent}
    ]
  },
  { path: 'guide/signup', component: GuideSignupComponent },
  { path: 'guide/login', component: LoginComponent },
  { path: 'guide/resetpassword', component: ResetPasswordComponent },
  { path: 'guide/home', component: GuideHomeComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'user/place', component: PlaceDetailedComponent },
  { path: 'user/planner', component: UserPlannerComponent, canActivate: [authGuard]},
  { path: 'user/itenary', component: UserItenariesComponent, canActivate: [authGuard]},
  { path: 'user/itenary/place', component: UserItenariesDetailedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
