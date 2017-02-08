import {Component, Input} from "@angular/core"
import {Intro} from "../../classes/Post"


@Component({
	selector: 'post-preview',
	templateUrl: './post-preview.component.html',
	styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent {
	@Input() intro: Intro
}