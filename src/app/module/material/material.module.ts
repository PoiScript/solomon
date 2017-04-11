import {
  MdButtonModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSnackBarModule,
  MdToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MdListModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdDialogModule,
    MdToolbarModule,
    MdSnackBarModule
  ],
  exports: [
    MdListModule,
    MdIconModule,
    MdInputModule,
    MdDialogModule,
    MdButtonModule,
    MdToolbarModule,
    MdSnackBarModule
  ]
})
export class SolomonMaterialModule {
}
