import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LoadingService, UserService } from 'app/core';

@Component({
  selector: 'solomon-auth-action',
  templateUrl: './auth-action.component.html',
  styleUrls: ['./auth-action.component.scss']
})
export class AuthActionComponent implements OnInit {

  title: string;
  content: string;
  showForm = false;

  private mode: string;
  private oobCode: string;

  constructor (private route: ActivatedRoute,
               private userService: UserService,
               private loadingService: LoadingService) { }

  ngOnInit () {
    this.route.queryParams.subscribe((params: Params) => {
      this.mode = params['mode'];
      this.oobCode = params['oobCode'];
      if (!this.oobCode) {
        this.invalid();
      } else if (this.mode === 'verifyEmail') {
        this.verifyEmail();
      } else if (this.mode === 'resetPassword') {
        this.resetPassword();
      } else {
        this.invalid();
      }
    });
  }

  submitNewPassword (newPassword: string) {
    this.showForm = false;
    this.content = 'Submitting your password.';
    this.loadingService.show();
    this.userService.confirmPasswordReset(this.oobCode, newPassword)
      .subscribe(
        () => this.content = 'Password reset complete.',
        () => this.content = 'There is something wrong with your verification',
        this.hideLoading
      );
  }

  private hideLoading = () => this.loadingService.hide();

  private invalid () {
    this.title = 'Invalid Action';
    this.content = 'The selected page mode is invalid.';
  }

  private verifyEmail () {
    this.title = 'Email Verification';
    this.content = 'Verifying your email...';
    this.loadingService.show();
    this.userService.confirmEmailVerification(this.oobCode)
      .subscribe(
        () => this.content = 'Your email has been verified.',
        () => this.content = 'There is something wrong with your verification'
      );
  }

  private resetPassword () {
    this.title = 'Password Reset';
    this.content = 'Verifying your oob code...';
    this.loadingService.show();
    this.userService.verifyPasswordReset(this.oobCode)
      .subscribe(() => {
          this.showForm = true;
          this.content = 'Input your new password.';
        },
        () => this.content = 'There is something wrong with your password reset.',
        this.hideLoading
      );
  }

}
