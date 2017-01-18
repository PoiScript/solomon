import {Component, OnInit} from "@angular/core"
import {BookService} from "../../service/book"
import {BookCollections} from "../../classes/BookCollections"

@Component({
	selector: 'book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
	bookCollections: BookCollections[]

	constructor(private bookService: BookService) {
	}

	getBookCollections(): void {
		this.bookService.getBooks()
			.then(bookCollections => this.bookCollections = bookCollections)
	}

	ngOnInit(): void {
		this.getBookCollections()
	}

}
