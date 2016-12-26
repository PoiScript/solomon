import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { AppComponent } from './app.component'
import { AppFooterComponent } from './app-footer.component'
import { AppNavComponent } from './app-nav.component'
import { AppIndexComponent } from './app-index.component'

import { CardTagComponent } from './card-tag.component'
import { PostListComponent } from './post-list.component'

import { AppRoutingModule } from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppNavComponent,
    PostListComponent,
    AppIndexComponent,
    CardTagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
