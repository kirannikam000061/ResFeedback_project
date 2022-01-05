import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestOnBoardComponent } from './rest-on-board.component';

describe('RestOnBoardComponent', () => {
  let component: RestOnBoardComponent;
  let fixture: ComponentFixture<RestOnBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestOnBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestOnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
