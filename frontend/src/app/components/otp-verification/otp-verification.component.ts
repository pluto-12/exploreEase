import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from "rxjs";
import { count, takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  

  loginForm: FormGroup = new FormGroup({});
  userEmail: string = ""
  otp: string = ""
  countdown: number = 60
  timerSubscription: Subscription | undefined
  otpError: boolean = false

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.otp = this.generateOtp();
    this.loginForm = this.fb.group({
      otp: ['', Validators.required]
    })
    this.userEmail = this.route.snapshot.queryParams['userEmail']
    this.startTimer()
    // console.log(otp, this.userEmail);
    this.authService.sendOtp(this.otp, this.userEmail).subscribe((response) => {
      console.log(response);
    })
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.stopTimer()
  }

  startTimer() {
    this.timerSubscription = timer(0,1000)
      .pipe(takeWhile(() => this.countdown > 0))
      .subscribe(() => {
        this.countdown --
        if(this.countdown == 0) {
          this.stopTimer()
        }
      })
  }

  stopTimer() {
    if(this.timerSubscription) {
      this.timerSubscription.unsubscribe()
    }
  }

  resendOtp () {
    this.countdown = 60
    this.otp = this.generateOtp()
    this.authService.sendOtp(this.otp, this.userEmail).subscribe((response) => {
      console.log(response);
    })
    this.startTimer()
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const userOtp = this.loginForm.value.otp
      if( this.otp == userOtp) {
        // console.log('here');
        this.authService.verifyEmail(this.userEmail).subscribe((response) => {
          console.log(response);          
        })
        this.router.navigateByUrl('/user/login')
      } else {
        this.otpError = true
        console.log(this.otpError);
      }
    }
  }

  generateOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString().padStart(4, '0');
  }
}
