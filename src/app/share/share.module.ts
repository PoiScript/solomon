import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MdCardModule, MdIconModule, MdListModule, MdSidenavModule, MdToolbarModule} from '@angular/material'
import {RouterModule} from '@angular/router'
import {PostService} from './service/post'
import {GitHubService} from './service/github'
import {FlexLayoutModule} from '@angular/flex-layout'
import {SnackBarService} from './service/snackbar'

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdIconModule,
    MdToolbarModule,
    MdCardModule,
    RouterModule,
    FlexLayoutModule,
    MdSidenavModule
  ],
  providers: [
    PostService,
    GitHubService,
    SnackBarService
  ]
})
export class ShareModule {
}
