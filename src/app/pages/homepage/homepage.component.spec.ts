import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule, POST_CONFIG } from 'app/shared';
import { MOCK_POSTS } from 'app/testing';
import { HomepageComponent } from './homepage.component';

let component: HomepageComponent;
let fixture: ComponentFixture<HomepageComponent>;
let element: HTMLElement;

describe('HomepageComponent', () => {
  describe('with no post provided', withNoPostProvided);
  describe('with two posts provided', withTwoPostsProvided);
});

function withNoPostProvided () {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HomepageComponent],
      providers: [
        {
          provide: POST_CONFIG,
          useValue: {posts: []}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display a header of \'Solomon\'', () => {
    expect(element.querySelector('.primary-header').textContent).toBe('Solomon');
  });

  it('should display length \'no post\'', () => {
    expect(element.querySelector('.primary-subheader').textContent).toContain('no post');
  });

  it('should not display any item', () => {
    expect(element.querySelectorAll('.post-list-item').length).toBe(0);
  });

  it('should display a hint of \'No Posts :(\' instead', () => {
    expect(element.textContent).toContain('No Posts :(');
  });
}

function withTwoPostsProvided () {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [HomepageComponent],
      providers: [
        {
          provide: POST_CONFIG,
          useValue: {
            posts: MOCK_POSTS
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display a header of \'Solomon\'', () => {
    expect(element.querySelector('.primary-header').textContent).toBe('Solomon');
  });

  it('should display length \'2 posts\'', () => {
    expect(element.querySelector('.primary-subheader').textContent).toContain('2 posts');
  });

  it('should display two items', () => {
    expect(element.querySelectorAll('.post-list-item').length).toBe(2);
  });
}
