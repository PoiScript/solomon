import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'app/shared/index';
import { MOCK_LINKS } from 'testing/index';
import { LinkComponent } from './link.component';

let component: LinkComponent;
let fixture: ComponentFixture<LinkComponent>;
let element: Element;

describe('LinkComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [LinkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.links = MOCK_LINKS;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have a header', () => {
    expect(element.querySelector('h1.primary-header').textContent).toBe('Link');
  });

  describe('when display the first link', whenDisplayTheFirstLink);
  describe('when display the second link', whenDisplayTheSecondLink);
});

function whenDisplayTheFirstLink() {
  const link = MOCK_LINKS[0];

  beforeEach(() => {
    element = element.querySelector('a:nth-child(1)');
  });

  it('should display avatars', () => {
    expect(
      element.querySelector('img.mat-list-avatar').getAttribute('src'),
    ).toBe(link.avatar);
  });

  it('should display link names', () => {
    expect(element.querySelector('.mat-list-text').textContent.trim()).toBe(
      link.name,
    );
  });

  it('should have a link point to address', () => {
    expect(element.getAttribute('href')).toBe(link.address);
  });
}

function whenDisplayTheSecondLink() {
  const link = MOCK_LINKS[1];

  beforeEach(() => {
    element = element.querySelector('a:nth-child(2)');
  });

  it('should display avatars', () => {
    expect(
      element.querySelector('img.mat-list-avatar').getAttribute('src'),
    ).toBe(link.avatar);
  });

  it('should display link names', () => {
    expect(element.querySelector('.mat-list-text').textContent.trim()).toBe(
      link.name,
    );
  });

  it('should have a link point to address', () => {
    expect(element.getAttribute('href')).toBe(link.address);
  });
}
