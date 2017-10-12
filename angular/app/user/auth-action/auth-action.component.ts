import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from 'app/core';

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
               private userService: UserService) { }

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
    this.userService.confirmPasswordReset(this.oobCode, newPassword)
      .then(res => this.content = 'Password reset complete.')
      .catch(error => 'There is something wrong with your verification');
  }

  private invalid () {
    this.title = 'Invalid Action';
    this.content = 'The selected page mode is invalid.';
  }

  private verifyEmail () {
    this.title = 'Email Verification';
    this.content = 'Verifying your email...';
    this.userService.confirmEmailVerification(this.oobCode)
      .then(res => this.content = 'Your email has been verified.')
      .catch(error => this.content = 'There is something wrong with your verification');
  }

  private resetPassword () {
    this.title = 'Password Reset';
    this.content = 'Verifying your oob code...';
    this.userService.verifyPasswordReset(this.oobCode)
      .then(() => {
        this.showForm = true;
        this.content = 'Input your new password.';
      })
      .catch(() => this.content = 'There is something wrong with your password reset.');
  }

}
