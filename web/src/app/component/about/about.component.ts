import { ChangeDetectorRef, OnInit, Component } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({ templateUrl: './about.component.html' })
export class AboutComponent implements OnInit {
  html: SafeHtml;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ post }) => {
      this.html = post;
      this.titleService.setTitle('About☆Solomon');
      this.cdRef.markForCheck();
    });
  }
}
