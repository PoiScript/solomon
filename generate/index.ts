import * as Rss from './rss';
import * as Render from './render';
import * as Write from './write';

import {Post} from '../src/app/shared/post';

const posts: Post[] = Render.parse('src/markdown');

Rss.addFeedItem(posts);

Write.post(posts);

Write.archive(posts);

Write.recent(posts);

Write.link('src/markdown/link.md');

Write.rss(Rss.extraXml());
