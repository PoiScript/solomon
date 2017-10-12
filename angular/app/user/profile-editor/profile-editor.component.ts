import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { User } from 'app/shared';

@Component({
  selector: 'solomon-profile-editor',
  templateUrl: './profile-editor.component.html'
})
export class ProfileEditorComponent {

  constructor (private dialogRef: MdDialogRef<ProfileEditorComponent>,
               @Inject(MD_DIALOG_DATA) public user: User) { }

  dialogClose (name: string, photo: string) {
    this.dialogRef.close({name, photo});
  }

}
