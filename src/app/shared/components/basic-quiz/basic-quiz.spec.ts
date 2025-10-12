import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicQuiz } from './basic-quiz';

describe('BasicQuiz', () => {
  let component: BasicQuiz;
  let fixture: ComponentFixture<BasicQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
