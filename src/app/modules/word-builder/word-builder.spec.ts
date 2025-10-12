import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordBuilder } from './word-builder';

describe('WordBuilder', () => {
  let component: WordBuilder;
  let fixture: ComponentFixture<WordBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
