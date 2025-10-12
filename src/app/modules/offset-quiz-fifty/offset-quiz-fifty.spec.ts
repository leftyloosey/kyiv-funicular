import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsetQuizFifty } from './offset-quiz-fifty';

describe('OffsetQuizFifty', () => {
  let component: OffsetQuizFifty;
  let fixture: ComponentFixture<OffsetQuizFifty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffsetQuizFifty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffsetQuizFifty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
