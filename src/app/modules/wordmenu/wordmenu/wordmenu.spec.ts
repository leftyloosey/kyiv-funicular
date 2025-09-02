import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wordmenu } from './wordmenu';

describe('Wordmenu', () => {
  let component: Wordmenu;
  let fixture: ComponentFixture<Wordmenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wordmenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wordmenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
