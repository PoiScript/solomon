import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RouterLinkStubDirective } from 'app/testing';
import { LoadingService } from 'app/core/loading.service';
import { NavComponent } from './nav.component';

let component: NavComponent;
let linkDes: DebugElement[];
let links: RouterLinkStubDirective[];
let fixture: ComponentFixture<NavComponent>;

describe('NavComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [LoadingService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('can get text content from template', () => {
    const linkTexts = linkDes.map(de => de.nativeElement.textContent);
    expect(linkTexts.length).toBe(3);
    expect(linkTexts[0]).toContain('SOLOMON');
    expect(linkTexts[1]).toContain('ABOUT');
    expect(linkTexts[2]).toContain('LINK');
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(3);
    expect(links[0].routerLink).toBe('/');
    expect(links[1].routerLink).toBe('/about');
    expect(links[2].routerLink).toBe('/link');
  });

  canClickTest(0, 'Solomon', '/');
  canClickTest(1, 'About', '/about');
  canClickTest(2, 'Link', '/link');
});

function canClickTest (index: number, button: string, routerLink: string) {
  it(`can click ${button} link in template`, () => {
    const linkDe = linkDes[index];
    const link = links[index];

    expect(link.navigatedTo).toBeNull();

    linkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(link.navigatedTo).toBe(routerLink);
  });
}
