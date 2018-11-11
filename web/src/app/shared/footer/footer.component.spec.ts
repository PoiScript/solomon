import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'app/shared/index';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [FooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display a link icon point to rss feed', () => {
    const icon = element.querySelector('a');
    expect(icon.textContent.trim()).toBe('rss_feed');
    expect(icon.getAttribute('href')).toBe('/atom.xml');
  });

  it('should display a license', () => {
    const license = element.querySelector('.footer-text');
    expect(license.textContent).toBe('Content licensed under CC-BY-SA-4.0.');
  });
});
