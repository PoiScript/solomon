import {Component, OnInit} from "@angular/core"
import {Category} from "../../classes/Category"
import {ActivatedRoute} from "@angular/router"
import {CategoryService} from "../../service/category"
import {Title} from "@angular/platform-browser"

@Component({
	template: `
    <app-header [title]="category?.title.zh_CHS"></app-header>
    <div class="container">
      <div *ngFor="let intro of category?.intros|step:2; let index = index">
        <div [fxLayout]="'row'" [fxLayout.xs]="'column'" [fxLayout.sm]="'column'">
          <post-preview [fxFlex]="50" [intro]="intro"></post-preview>
          <post-preview [fxFlex]="50" *ngIf="category.intros[index + 1]" [intro]="category.intros[index + 1]"></post-preview>
        </div>
      </div>
    </div>
	`,
})
export class CategoryComponent implements OnInit {
	category: Category

	constructor(private categoryService: CategoryService,
	            private router: ActivatedRoute,
	            private titleService: Title) {
	}

	getCategory(title: string): void {
		this.categoryService
			.getCategories()
			.then(categories => this.category = categories.find(category => category.title.en === title))
	}

	ngOnInit(): void {
		this.router.params.subscribe(
			params => {
				this.getCategory(params['title'])
				this.titleService.setTitle(`${params['title']} - Solomon`)
			}
		)
	}
}
