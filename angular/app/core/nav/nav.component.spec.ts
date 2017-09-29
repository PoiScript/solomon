import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdToolbarModule } from '@angular/material';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MdToolbarModule ],
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should display a router link to homepage', () => {
    const solomon = element.querySelector('a:nth-child(1)');
    expect(solomon.textContent).toContain('SOLOMON');
    expect(solomon.getAttribute('routerLink')).toBe('/');
  });

  it('should display a router link to about page', () => {
    const solomon = element.querySelector('a:nth-child(2)');
    expect(solomon.textContent).toContain('ABOUT');
    expect(solomon.getAttribute('routerLink')).toBe('/about');
  });

  it('should display a router link to link page', () => {
    const solomon = element.querySelector('a:nth-child(3)');
    expect(solomon.textContent).toContain('LINK');
    expect(solomon.getAttribute('routerLink')).toBe('/link');
  });
});
