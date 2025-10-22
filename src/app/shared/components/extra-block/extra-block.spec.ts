import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraBlock } from './extra-block';

describe('ExtraBlock', () => {
  let component: ExtraBlock;
  let fixture: ComponentFixture<ExtraBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
