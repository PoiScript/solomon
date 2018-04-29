import { Pipe, PipeTransform } from '@angular/core';

import { PostDict, Post } from 'app/models';

@Pipe({ name: 'tag' })
export class TagPipe implements PipeTransform {
  transform(postDict: PostDict, tag: string): Post[] {
    const result = [];
    for (const slug in postDict) {
      if (postDict[slug].tags.includes(tag)) {
        result.push(postDict[slug]);
      }
    }
    return result;
  }
}
