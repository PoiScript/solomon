import { NgModule }             from '@angular/core'
import { CommonModule }         from '@angular/common'
import { MaterialModule }       from '@angular/material'
import { FlexLayoutModule }     from '@angular/flex-layout'

import { HomeComponent }        from './home.component'
import { AboutComponent }       from './about'
import { CategoriesComponent }  from './categories'
import { ArchivesComponent }    from './archives'
import { PostsComponent }       from './posts'

import { HomeRouting }          from './home.routing'


@NgModule({
  imports: [
    HomeRouting,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    PostsComponent,
    ArchivesComponent,
    CategoriesComponent,
  ]
})

export class HomeModule {}
