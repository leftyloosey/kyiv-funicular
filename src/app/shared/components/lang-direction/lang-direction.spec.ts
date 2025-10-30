import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangDirection } from './lang-direction';

describe('LangDirection', () => {
  let component: LangDirection;
  let fixture: ComponentFixture<LangDirection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangDirection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangDirection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
