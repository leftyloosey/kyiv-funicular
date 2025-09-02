import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imperfect } from './imperfect';

describe('Imperfect', () => {
  let component: Imperfect;
  let fixture: ComponentFixture<Imperfect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imperfect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imperfect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
