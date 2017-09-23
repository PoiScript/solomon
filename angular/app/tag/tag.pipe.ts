import { Pipe, PipeTransform } from '@angular/core';

import { Post } from 'app/shared/post.model';

@Pipe({
  name: 'tag'
})
export class TagPipe implements PipeTransform {
  transform(posts: Post[], tag: string): Post[] {
    return posts.filter(post => post.tags.includes(tag));
  }
}
