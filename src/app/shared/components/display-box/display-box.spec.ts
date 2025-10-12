import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBox } from './display-box';

describe('DisplayBox', () => {
  let component: DisplayBox;
  let fixture: ComponentFixture<DisplayBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
