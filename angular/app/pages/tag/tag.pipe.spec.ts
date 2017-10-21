import { TagPipe } from './tag.pipe';

const MOCK_POSTS = [{
  title: 'Lorem ipsum dolor sit amet',
  slug: 'lorem-ipsum-dolor-sit-amet',
  date: '1970-01-01T00:00:00.000Z',
  tags: ['lorem', 'ipsum'],
}, {
  title: 'Consectetur adipiscing elit',
  slug: 'consectetur-adipiscing-elit',
  date: '1970-01-01T00:00:00.000Z',
  tags: ['ipsum'],
}];

describe('TagPipe', () => {
  const pipe = new TagPipe();

  it('should get both two posts', () => {
    expect(pipe.transform(MOCK_POSTS, 'ipsum')).toEqual(MOCK_POSTS);
  });

  it('should get only one post', () => {
    expect(pipe.transform(MOCK_POSTS, 'lorem')).toEqual([MOCK_POSTS[0]]);
  });

  it('should get an empty array', () => {
    expect(pipe.transform(MOCK_POSTS, 'dolor')).toEqual([]);
  });
});
