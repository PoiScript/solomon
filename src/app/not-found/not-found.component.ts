import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({ templateUrl: './not-found.component.html' })
export class NotFoundComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('not found | solomon');
  }
}
