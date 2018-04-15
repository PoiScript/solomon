import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'app/shared';
import { MOCK_POSTS } from 'testing';
import { UpNextComponent } from './up-next.component';

let component: UpNextComponent;
let element: HTMLElement;
let fixture: ComponentFixture<UpNextComponent>;

const post = MOCK_POSTS[0];

describe('UpNextComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, RouterTestingModule],
        declarations: [UpNextComponent],
      }).compileComponents();
    }),
  );

  describe('with no post provided', withNoPostProvided);
  describe('with prior post provided', withPriorPostProvided);
  describe('with next post provided', withNextPostProvided);
});

function withNoPostProvided() {
  beforeEach(() => {
    fixture = TestBed.createComponent(UpNextComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should not display the navigation', () => {
    fixture.detectChanges();
    expect(element.querySelector('#nav-next')).toBe(null);
    expect(element.querySelector('#nav-prior')).toBe(null);
  });
}

function withPriorPostProvided() {
  beforeEach(() => {
    fixture = TestBed.createComponent(UpNextComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.prior = post;
    fixture.detectChanges();
  });

  it('should display a icon', () => {
    const icon = element.querySelector('#nav-prior mat-icon');
    expect(icon.textContent).toBe('keyboard_arrow_left');
    expect(icon.getAttribute('aria-label')).toBe('prior post');
  });

  it('should display two texts', () => {
    const text = element.querySelector('#nav-prior .nav-text');
    expect(text.textContent).toContain('Prior');
    expect(text.textContent).toContain(post.title);
  });

  it('should display a button', () => {
    expect(
      element
        .querySelector('#nav-prior a.mat-icon-button')
        .getAttribute('href'),
    ).toBe('/post/' + post.slug);
  });
}

function withNextPostProvided() {
  beforeEach(() => {
    fixture = TestBed.createComponent(UpNextComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.next = post;
    fixture.detectChanges();
  });

  it('should display a icon', () => {
    const icon = element.querySelector('#nav-next mat-icon');
    expect(icon.textContent).toBe('keyboard_arrow_right');
    expect(icon.getAttribute('aria-label')).toBe('next post');
  });

  it('should display two texts', () => {
    const text = element.querySelector('#nav-next .nav-text');
    expect(text.textContent).toContain('Next');
    expect(text.textContent).toContain(post.title);
  });

  it('should display a button', () => {
    expect(
      element.querySelector('#nav-next a.mat-icon-button').getAttribute('href'),
    ).toBe('/post/' + post.slug);
  });
}
