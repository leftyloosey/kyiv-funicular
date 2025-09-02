import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Noun } from './noun';

describe('Noun', () => {
  let component: Noun;
  let fixture: ComponentFixture<Noun>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Noun]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Noun);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
