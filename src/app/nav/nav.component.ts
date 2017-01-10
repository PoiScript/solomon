import {Component, Input, OnInit} from "@angular/core"
import {global} from "../../config/global"
import {PostService} from "../service/post/post.service"

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {
	menu = global.menu
	categories: any[] = []
	@Input() isDarkTheme: boolean

	constructor(private _postService: PostService) {
	}

	ngOnInit() {
		this._postService.getAllCategories()
			.subscribe(
				data => {
					for (let k in data) {
						if (data.hasOwnProperty(k))
							this.categories.push({title: k, count: data[k].length})
					}
				},
				err => alert(err)
			)
	}
}