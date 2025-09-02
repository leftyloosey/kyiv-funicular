import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newword } from './newword';

describe('Newword', () => {
  let component: Newword;
  let fixture: ComponentFixture<Newword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
