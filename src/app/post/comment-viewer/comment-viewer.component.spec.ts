import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentViewerComponent } from './comment-viewer.component';

describe('CommentViewerComponent', () => {
  let component: CommentViewerComponent;
  let fixture: ComponentFixture<CommentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
