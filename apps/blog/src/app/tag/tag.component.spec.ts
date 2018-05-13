import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule, POST_CONFIG } from 'app/shared/index';
import { ActivatedRouteStub, MOCK_POSTS } from 'testing/index';
import { TagPipe } from './tag.pipe';
import { TagComponent } from './tag.component';

let component: TagComponent;
let element: HTMLElement;
let fixture: ComponentFixture<TagComponent>;

const activatedRoute = new ActivatedRouteStub();

describe('TagComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [TagComponent, TagPipe],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
        {
          provide: POST_CONFIG,
          useValue: {
            posts: MOCK_POSTS,
          },
        },
      ],
    }).compileComponents();
  }));

  describe('with tag tag only one post has', withTheTagOnlyOnePostHas);
  describe('with the tag two posts contain', withTheTagTwoPostsContain);
  describe('with the tag does not exist', withTagDoesNotExist);
});

function withTheTagOnlyOnePostHas() {
  beforeEach(() => {
    activatedRoute.testParams = { tag: 'only-one-post-has-this' };
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should display a header '#only-one-post-has-this'", () => {
    expect(element.querySelector('.primary-header').textContent).toBe(
      '#only-one-post-has-this',
    );
  });

  it("should display length '1 post'", () => {
    expect(element.querySelector('.primary-subheader').textContent).toContain(
      '1 post',
    );
  });

  it('should display one item', () => {
    expect(element.querySelectorAll('.post-list-item').length).toBe(1);
  });
}

function withTheTagTwoPostsContain() {
  beforeEach(() => {
    activatedRoute.testParams = { tag: 'two-posts-share-this' };
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should display header of '#two-posts-share-this'", () => {
    expect(element.querySelector('h1.primary-header').textContent).toBe(
      '#two-posts-share-this',
    );
  });

  it("should display length '2 posts'", () => {
    expect(element.querySelector('.primary-subheader').textContent).toContain(
      '2 posts',
    );
  });

  it('should display two items', () => {
    expect(element.querySelectorAll('.post-list-item').length).toBe(2);
  });
}

function withTagDoesNotExist() {
  beforeEach(() => {
    activatedRoute.testParams = { tag: 'not-exists' };
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should display header of '#not-exists'", () => {
    expect(element.querySelector('h1.primary-header').textContent).toBe(
      '#not-exists',
    );
  });

  it("should display length 'no post'", () => {
    expect(element.querySelector('.primary-subheader').textContent).toContain(
      'no post',
    );
  });

  it('should not display any item', () => {
    expect(element.querySelectorAll('.post-list-item').length).toBe(0);
  });

  it("should display a hint of 'No Posts :(' instead", () => {
    expect(element.textContent).toContain('No Posts :(');
  });
}
