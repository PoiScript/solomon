import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostListComponent } from './post-list.component';

const MOCK_POSTS = [{
  title: 'Lorem ipsum dolor sit amet',
  slug: 'lorem-ipsum-dolor-sit-amet',
  date: '1970-01-01T00:00:00.000Z',
  tags: ['lorem', 'ipsum'],
}, {
  title: 'Consectetur adipiscing elit',
  slug: 'consectetur-adipiscing-elit',
  date: '2006-08-14T02:34:56.789Z',
  tags: ['ipsum'],
}];

describe('PostListComponent', () => {
  let component: PostListComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should display \'No Posts :(\' when an empty array is provided', () => {
    component.posts = [];
    fixture.detectChanges();
    expect(element.textContent).toContain('No Posts :(');
  });

  it('should display post\'s title as a link', () => {
    component.posts = MOCK_POSTS;
    fixture.detectChanges();
    const titles = element.querySelectorAll('.post-list-item a.title');
    expect(titles[0].textContent.trim()).toBe(MOCK_POSTS[0].title);
    expect(titles[1].textContent.trim()).toBe(MOCK_POSTS[1].title);
    expect(titles[0].getAttribute('href')).toBe('/post/' + MOCK_POSTS[0].slug);
    expect(titles[1].getAttribute('href')).toBe('/post/' + MOCK_POSTS[1].slug);
  });

  it('should display post\'s date in mediumDate format', () => {
    component.posts = MOCK_POSTS;
    fixture.detectChanges();
    const subtitles = element.querySelectorAll('.post-list-item .subtitle');
    expect(subtitles[0].textContent).toContain('Jan 1, 1970');
    expect(subtitles[1].textContent).toContain('Aug 14, 2006');
  });

  it('should display post\'s tags as links', () => {
    component.posts = MOCK_POSTS;
    fixture.detectChanges();
    const subtitles = element.querySelectorAll('.post-list-item .subtitle');
    expect(subtitles[0].textContent).toContain(MOCK_POSTS[0].tags[0]);
    expect(subtitles[0].textContent).toContain(MOCK_POSTS[0].tags[1]);
    expect(subtitles[1].textContent).toContain(MOCK_POSTS[1].tags[0]);
    const first_post_tags = subtitles[0].querySelectorAll('a.tag');
    const second_post_tags = subtitles[1].querySelectorAll('a.tag');
    expect(first_post_tags[0].getAttribute('href')).toBe('/tag/' + MOCK_POSTS[0].tags[0]);
    expect(first_post_tags[1].getAttribute('href')).toBe('/tag/' + MOCK_POSTS[0].tags[1]);
    expect(second_post_tags[0].getAttribute('href')).toBe('/tag/' + MOCK_POSTS[1].tags[0]);
  });
});
