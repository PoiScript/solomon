import {Injectable} from "@angular/core"
import {Post, MOCK_POSTS} from "./post"

@Injectable()

export class PostService {
	getPosts(): Post[] {
		return MOCK_POSTS
	}
}