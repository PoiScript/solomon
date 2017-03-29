import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor (private snackBar: MdSnackBar) {
  }

  openSnackBar (msg: string, action = '', duration = 1000): void {
    this.snackBar.open(msg, action, {duration: duration});
  }

}
