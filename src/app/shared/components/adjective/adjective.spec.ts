import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adjective } from './adjective';

describe('Adjective', () => {
  let component: Adjective;
  let fixture: ComponentFixture<Adjective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adjective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adjective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
