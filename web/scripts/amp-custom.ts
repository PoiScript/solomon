import { writeFileSync } from 'fs';
import { join } from 'path';
import { renderSync } from 'sass';

const src = join(__dirname, '../src');

const sassData = `
@import "${join(src, './styles.scss')}";
@import "${join(src, './app/app.component.scss')}";
@import "${join(src, './app/components/footer/footer.component.scss')}";
@import "${join(src, './app/components/header/header.component.scss')}";
@import "${join(src, './app/components/loading/loading.component.scss')}";
@import "${join(src, './app/components/post/post.component.scss')}";
`;

const result = renderSync({
  data: sassData,
  outputStyle: 'compressed',
  importer: url => {
    if (url.startsWith('~')) {
      return { file: join(__dirname, '../node_modules/', url.slice(1)) };
    }
  },
});

writeFileSync('./amp-custom.css', result.css);
