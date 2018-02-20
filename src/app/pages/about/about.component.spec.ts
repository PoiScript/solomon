import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should display a header', () => {
    expect(element.querySelector('.primary-header').textContent).toBe('About');
  });

  it('should display my gpg signature', () => {
    expect(element.textContent).toContain('EC56 5FE9 8A6F 316A B69F 6979 8EE0 5E84 4452 6ED5');
  });

  it('should display original age', () => {
    fixture.detectChanges();
    expect(element.textContent).toContain(component.days.toString());
  });

  it('should display a different test age', () => {
    component.days = 42;
    fixture.detectChanges();
    expect(element.textContent).toContain('42');
  });
});
