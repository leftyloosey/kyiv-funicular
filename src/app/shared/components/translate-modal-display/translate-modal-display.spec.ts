import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModalDisplay } from './translate-modal-display';

describe('TranslateModalDisplay', () => {
  let component: TranslateModalDisplay;
  let fixture: ComponentFixture<TranslateModalDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModalDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateModalDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
