import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";

import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { CordinatorHomeComponent } from './components/cordinator/cordinator-home/cordinator-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GuideSignupComponent } from './components/guide-signup/guide-signup.component';
import { HeaderInterceptor } from './interceptor/header.interceptor';
import { GuideRequestsComponent } from './components/cordinator/guide-requests/guide-requests.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { GuideHomeComponent } from './components/guide-home/guide-home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GuideListComponent } from './components/cordinator/guide-list/guide-list.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserListComponent } from './components/admin-home/user-list/user-list.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { PlaceListComponent } from './components/cordinator/place-list/place-list.component';
import { AddnewDialogComponent } from './components/addnew-dialog/addnew-dialog.component';
import { PlaceDetailedComponent } from './components/place-detailed/place-detailed.component';
import { UserPlannerComponent } from './components/user-planner/user-planner.component';
import { UserItenariesComponent } from './components/user-itenaries/user-itenaries.component';
import { UserItenariesDetailedComponent } from './components/user-itenaries-detailed/user-itenaries-detailed.component';

// import { NgxGooglePlacesAutocompleteModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    UserSignupComponent,
    OtpVerificationComponent,
    UserHomeComponent,
    CordinatorHomeComponent,
    NavbarComponent,
    GuideSignupComponent,
    GuideRequestsComponent,
    GuideHomeComponent,
    ResetPasswordComponent,
    GuideListComponent,
    AdminHomeComponent,
    UserListComponent,
    InfoDialogComponent,
    PlaceListComponent,
    AddnewDialogComponent,
    PlaceDetailedComponent,
    UserPlannerComponent,
    UserItenariesComponent,
    UserItenariesDetailedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatGridListModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    StoreModule.forRoot({ userReducer: userReducer }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
