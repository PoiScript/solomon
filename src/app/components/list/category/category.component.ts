import {Component, Input} from "@angular/core"
import {Category} from "../../../classes/Category"

@Component({
	selector: 'category-list',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryListComponent {
	@Input() categories: Category[]
	@Input() title: string
}
