import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {Intro} from '../../class/post'

@Injectable()
export class HeaderService {
  private isPostSource = new Subject<boolean>()
  private titleSource = new Subject<string>()
  private introSource = new Subject<Intro>()

  isPost$ = this.isPostSource.asObservable()
  title$ = this.titleSource.asObservable()
  intro$ = this.introSource.asObservable()

  changeHomeHeader(title: string) {
    this.isPostSource.next(false)
    this.titleSource.next(title)
  }

  changePostHeader(intro: Intro) {
    this.isPostSource.next(true)
    this.introSource.next(intro)
  }

}
