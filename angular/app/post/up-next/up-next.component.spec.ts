import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'app/shared';
import { UpNextComponent } from './up-next.component';

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

describe('UpNextComponent', () => {
  let component: UpNextComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<UpNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [UpNextComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpNextComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should not display the navigation when the input is empty', () => {
    fixture.detectChanges();
    expect(element.querySelector('#nav-next')).toBe(null);
    expect(element.querySelector('#nav-prior')).toBe(null);
  });

  it('should display icons', () => {
    [component.prior, component.next] = MOCK_POSTS;
    fixture.detectChanges();
    const icons = element.querySelectorAll('mat-icon');
    expect(icons[0].textContent).toBe('keyboard_arrow_left');
    expect(icons[1].textContent).toBe('keyboard_arrow_right');
    expect(icons[0].getAttribute('aria-label')).toBe('prior post');
    expect(icons[1].getAttribute('aria-label')).toBe('next post');
  });

  it('should display texts', () => {
    [component.prior, component.next] = MOCK_POSTS;
    fixture.detectChanges();
    const texts = element.querySelectorAll('.nav-text');
    expect(texts[0].textContent).toContain('Prior');
    expect(texts[1].textContent).toContain('Next');
    expect(texts[0].textContent).toContain(MOCK_POSTS[0].title);
    expect(texts[1].textContent).toContain(MOCK_POSTS[1].title);
  });

  it('should display router buttons', () => {
    [component.prior, component.next] = MOCK_POSTS;
    fixture.detectChanges();
    const buttons = element.querySelectorAll('a.mat-icon-button');
    expect(buttons[0].getAttribute('href')).toBe('/post/' + MOCK_POSTS[0].slug);
    expect(buttons[1].getAttribute('href')).toBe('/post/' + MOCK_POSTS[1].slug);
  });
});
