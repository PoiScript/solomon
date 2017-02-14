import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Category} from "../../classes/Category"

@Injectable()
export class CategoryService {
  categories: Category[]

  constructor(private http: Http) {
  }

  getCategories(): Promise<Category []> {
    if (this.categories) return new Promise(resolve => resolve(this.categories))
    else return this.http.get('/json/categories.json')
      .toPromise()
      .then(res => res.json() as Category[])
      .then(categories => this.categories = categories)
  }
}
