import {Component} from "@angular/core"

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})

export class NavComponent {
	categories = [
		{
			title: 'Test 1',
			count: 23
		},
		{
			title: 'Test 2',
			count: 34
		},
		{
			title: 'Test 3',
			count: 45
		}
	]
	menu = [
		{
			title: 'Recent',
			path: '/recent'
		},
		{
			title: 'About',
			path: '/about'
		},
		{
			title: 'Links',
			path: '/links'
		},
		{
			title: 'Random',
			path: '/rand'
		}
	]
}