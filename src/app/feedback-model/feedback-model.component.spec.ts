import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackModelComponent } from './feedback-model.component';

describe('FeedbackModelComponent', () => {
  let component: FeedbackModelComponent;
  let fixture: ComponentFixture<FeedbackModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
