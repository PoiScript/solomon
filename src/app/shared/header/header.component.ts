import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'solomon-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _url: string;

  get url (): string {
    return this._url || 'home';
  }

  get isHome (): boolean {
    return !this._url;
  }

  constructor (private router: Router) { }

  ngOnInit () {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((nav: NavigationEnd) => this._url = nav.url.split('/')[1]);
  }

}
