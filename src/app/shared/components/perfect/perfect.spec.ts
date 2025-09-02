import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perfect } from './perfect';

describe('Perfect', () => {
  let component: Perfect;
  let fixture: ComponentFixture<Perfect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perfect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
