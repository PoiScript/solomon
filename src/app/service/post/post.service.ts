import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/add/operator/toPromise'

import {Intro, Post} from '../../class/post'

@Injectable()
export class PostService {
  private archive: Intro[]
  private recent: Intro[]

  constructor(private http: Http) {
  }

  getRecent(): Promise<Intro []> {
    if (this.recent) return new Promise(resolve => resolve(this.recent))
    return this.http.get('/json/recent.json')
      .toPromise()
      .then(res => res.json() as Intro[])
      .then(recent => this.recent = recent)
      .catch(PostService.handleError)
  }

  getArchive(): Promise<Intro []> {
    if (this.archive) return new Promise(resolve => resolve(this.archive))
    return this.http.get('/json/archive.json')
      .toPromise()
      .then(res => res.json() as Intro[])
      .then(archive => this.archive = archive)
      .catch(PostService.handleError)
  }

  getPost(slug: string): Promise<Post> {
    return this.http.get(`/json/${slug}.json`)
      .toPromise()
      .then(res => res.json() as Post)
      .catch(PostService.handleError)
  }

  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }
}
