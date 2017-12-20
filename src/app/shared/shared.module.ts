import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatListModule, MatProgressBarModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

import { PostListComponent } from './post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule
  ],
  declarations: [
    PostListComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    PostListComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class SharedModule {}
