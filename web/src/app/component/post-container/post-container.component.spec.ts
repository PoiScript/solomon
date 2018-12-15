import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ActivatedRouteStub, MOCK_POSTS } from 'testing/index';
import { PostContainerComponent } from './post-container.component';

describe('PostContainerComponent', () => {
  let component: PostContainerComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<PostContainerComponent>;

  const activatedRoute = new ActivatedRouteStub();
  const current = MOCK_POSTS[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.testData = {
      resolve: { current, html: 'Lorem ipsum dolor sit ...' },
    };
    fixture = TestBed.createComponent(PostContainerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display a title', () => {
    const title = element.querySelector('.primary-header');
    expect(title.textContent).toBe(current.title);
  });

  it('should display date', () => {
    const subtitle = element.querySelector('.primary-subheader');
    expect(subtitle.textContent).toContain('Jan 1, 1970');
  });

  it('should display tags', () => {
    const subtitle = element.querySelector('.primary-subheader');
    current.tags.forEach(tag =>
      expect(subtitle.textContent).toContain('#' + tag),
    );
  });

  it('should display post content html', () => {
    const article = element.querySelector('article');
    expect(article.textContent).toContain('Lorem ipsum dolor sit ...');
  });
});
