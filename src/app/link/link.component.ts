import {Component, OnInit} from '@angular/core';
import {link} from "../../config/link"

@Component({
	selector: 'link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  links: any[]

	constructor() {
	}

	ngOnInit() {
  	this.links = link
	}

}
