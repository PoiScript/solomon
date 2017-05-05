import * as Rss from './rss';
import * as Render from './render';
import * as Generate from './write';

import {Post} from '../src/app/class/post';

const posts: Post[] = Render.parse('src/markdown');

Rss.addFeedItem(posts);

Generate.post(posts);

Generate.archive(posts);

Generate.recent(posts);

Generate.link('src/markdown/link.md');

Generate.rss(Rss.extraXml());
