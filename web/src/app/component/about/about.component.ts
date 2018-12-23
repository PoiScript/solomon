import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

const birthday = 845971200000;
const oneDay = 8.64e7;
const seventhYears = 5.361e11;

@Component({ templateUrl: './about.component.html' })
export class AboutComponent {
  days = Math.floor((Date.now() - birthday - seventhYears) / oneDay);

  constructor(private titleService: Title) {
    this.titleService.setTitle('About☆Solomon');
  }
}
