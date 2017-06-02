import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'solomon-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor (injector: Injector,
               private route: ActivatedRoute,
               private router: Router) {
  }

  ngOnInit () {
  }
}
