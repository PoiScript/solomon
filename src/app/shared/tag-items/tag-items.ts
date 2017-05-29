import {Injectable} from '@angular/core';

import {PostItems} from '../post-items/post-items';

export interface TagItems {
  tag: string;
  count: number;
  posts: PostItems[];
}

// @Injectable()
// export class TagItems {
//   getItemByName (tag: string): TagItems {
//     return POSTS.find(i => i.slug === slug);
//   }
// }
