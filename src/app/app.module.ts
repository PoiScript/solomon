import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { AppComponent } from './app.component'
import { AppFooterComponent } from './app-footer.component'
import { AppNavComponent } from './app-nav.component'

import { MainModule } from './main/main.module'

import { AppRoutingModule } from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppNavComponent,
  ],
  imports: [
    MainModule,
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
