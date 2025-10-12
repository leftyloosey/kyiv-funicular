import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopForm } from './top-form';

describe('TopForm', () => {
  let component: TopForm;
  let fixture: ComponentFixture<TopForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
