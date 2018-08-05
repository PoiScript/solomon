import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatButtonModule,
  MatIconModule,
  MatIconRegistry,
  MatListModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
  ],
  declarations: [PostListComponent, HeaderComponent, FooterComponent],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PostListComponent,
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})
export class SharedModule {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.registerIcon('arrow');
    this.registerIcon('github');
    this.registerIcon('rss');
  }

  private registerIcon(name: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/svg/${name}.svg`),
    );
  }
}
