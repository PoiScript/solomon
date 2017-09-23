import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewerComponent } from './post-viewer.component';

describe('PostViewerComponent', () => {
  let component: PostViewerComponent;
  let fixture: ComponentFixture<PostViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
