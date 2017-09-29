import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdIconModule } from '@angular/material';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MdIconModule ],
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should display a link point to rss feed', () => {
    const icon = element.querySelector('a');
    expect(icon.textContent).toContain('rss_feed');
    expect(icon.getAttribute('href')).toBe('/atom.xml');
  });

  it('should display a license', () => {
    const license = element.querySelector('.footer-text');
    expect(license.textContent).toContain('Content licensed under CC-BY-SA-4.0.');
  });
});
