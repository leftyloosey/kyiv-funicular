import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModalG } from './translate-modal-g';

describe('TranslateModalG', () => {
  let component: TranslateModalG;
  let fixture: ComponentFixture<TranslateModalG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModalG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateModalG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
