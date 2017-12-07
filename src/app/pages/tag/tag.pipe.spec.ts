import { TagPipe } from './tag.pipe';
import { MOCK_POSTS } from 'app/testing';

describe('TagPipe', () => {
  const pipe = new TagPipe();

  describe('with tag \'only-one-post-has-this\'', () => {
    it('should get only one post', () => {
      expect(pipe.transform(MOCK_POSTS, 'only-one-post-has-this')).toEqual([MOCK_POSTS[0]]);
    });
  });

  describe('with tag \'two-posts-share-this\'', () => {
    it('should get both two posts', () => {
      expect(pipe.transform(MOCK_POSTS, 'two-posts-share-this')).toEqual(MOCK_POSTS);
    });
  });

  describe('with tag \'not-exists\'', () => {
    it('should get an empty array', () => {
      expect(pipe.transform(MOCK_POSTS, 'not-exists')).toEqual([]);
    });
  });
});
