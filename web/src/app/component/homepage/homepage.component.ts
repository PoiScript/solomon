import { OnInit, ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  postGroup = [];

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ group }) => {
      this.titleService.setTitle('Home☆Solomon');
      this.postGroup = group;
      this.cdRef.detectChanges();
    });
  }
}
