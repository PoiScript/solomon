import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {
  constructor (private snackBar: MdSnackBar) {}

  open (message: string) {
    this.snackBar.open(message, null, {duration: 2000});
  }
}
