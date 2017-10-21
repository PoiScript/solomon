import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_CONFIG } from 'app/app.config';
import { SharedModule } from 'app/shared';

import { LinkComponent } from './link.component';

const MOCK_LINKS = [{
  address: 'https://www.microsoft.com/',
  avatar: 'https://github.com/microsoft.png',
  name: 'Microsoft'
}, {
  address: 'https://www.google.com/',
  avatar: 'https://github.com/google.png',
  name: 'Google'
}];

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LinkComponent],
      providers: [{provide: APP_CONFIG, useValue: {links: MOCK_LINKS}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should have a header', () => {
    expect(element.querySelector('h1.primary-header').textContent).toBe('Link');
  });

  it('should display avatars', () => {
    const items = element.querySelectorAll('img.mat-list-avatar');
    expect(items[0].getAttribute('src')).toBe(MOCK_LINKS[0].avatar);
    expect(items[1].getAttribute('src')).toBe(MOCK_LINKS[1].avatar);
  });

  it('should display link names', () => {
    const items = element.querySelectorAll('.mat-list-text');
    expect(items[0].textContent.trim()).toBe(MOCK_LINKS[0].name);
    expect(items[1].textContent.trim()).toBe(MOCK_LINKS[1].name);
  });

  it('should have a link point to address', () => {
    const items = element.querySelectorAll('a.mat-list-item');
    expect(items[0].getAttribute('href')).toBe(MOCK_LINKS[0].address);
    expect(items[1].getAttribute('href')).toBe(MOCK_LINKS[1].address);
  });
});
