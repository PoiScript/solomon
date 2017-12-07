import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostListComponent } from './post-list.component';
import { MOCK_POSTS } from 'app/testing';

let component: PostListComponent;
let element: Element;
let fixture: ComponentFixture<PostListComponent>;

describe('PostListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostListComponent]
    })
      .compileComponents();
  }));

  describe('with no post provided', withNoPostProvided);
  describe('with two posts provided', withTwoPostsProvided);
});

function withNoPostProvided () {
  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    component.posts = [];
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display \'No Posts :(\'', () => {
    expect(element.textContent).toContain('No Posts :(');
  });
}

function withTwoPostsProvided () {
  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    component.posts = MOCK_POSTS;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('when rendering the first post', () => {
    beforeEach(() => {
      element = element.querySelectorAll('.post-list-item')[0];
    });

    it('should display the post\'s title as a link', () => {
      const title = element.querySelector('.post-list-item a');
      expect(title.textContent.trim()).toBe(MOCK_POSTS[0].title);
      expect(title.getAttribute('href')).toBe('/post/' + MOCK_POSTS[0].slug);
    });

    it('should display the post\'s date in mediumDate format', () => {
      expect(element.querySelector('.post-list-item p span').textContent).toBe('Jan 1, 1970');
    });

    it('should display post\'s tags as links', () => {
      const tags = element.querySelectorAll('.post-list-item .subtitle .tag');
      const [tag0, tag1] = MOCK_POSTS[0].tags;
      expect(tags[0].textContent).toContain(tag0);
      expect(tags[1].textContent).toContain(tag1);
      expect(tags[0].getAttribute('href')).toBe('/tag/' + tag0);
      expect(tags[1].getAttribute('href')).toBe('/tag/' + tag1);
    });
  });

  describe('when rendering the second post', () => {
    beforeEach(() => {
      element = element.querySelectorAll('.post-list-item')[1];
    });

    it('should display the post\'s title as a link', () => {
      const title = element.querySelector('.post-list-item a');
      expect(title.textContent.trim()).toBe(MOCK_POSTS[1].title);
      expect(title.getAttribute('href')).toBe('/post/' + MOCK_POSTS[1].slug);
    });

    it('should display the post\'s date in mediumDate format', () => {
      expect(element.querySelector('.post-list-item p span').textContent).toBe('Aug 14, 2006');
    });

    it('should display post\'s tags as links', () => {
      const tag = element.querySelector('.post-list-item .subtitle .tag');
      const [expectedTag] = MOCK_POSTS[1].tags;
      expect(tag.textContent).toContain(expectedTag);
      expect(tag.getAttribute('href')).toBe('/tag/' + expectedTag);
    });
  });
}
