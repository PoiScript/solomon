import {Component, Input, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {User} from 'firebase/app';
import {Observable} from 'rxjs/Observable';

import {Comment} from '../../../../class/comment';

@Component({
  selector: 'solomon-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {
  user: Observable<User>;
  @Input() slug: string;
  comments: FirebaseListObservable<Comment[]>;

  constructor (public auth: AngularFireAuth,
               private db: AngularFireDatabase) {
    this.user = auth.authState;
  }

  ngOnInit (): void {
    this.comments = this.db.list(`comment/${this.slug}`);
  }
}
