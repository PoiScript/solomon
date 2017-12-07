import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthActionComponent } from './auth-action.component';

describe('AuthActionComponent', () => {
  let component: AuthActionComponent;
  let fixture: ComponentFixture<AuthActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
