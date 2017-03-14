import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeColumnComponent } from './home-column.component';

describe('HomeColumnComponent', () => {
  let component: HomeColumnComponent;
  let fixture: ComponentFixture<HomeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
