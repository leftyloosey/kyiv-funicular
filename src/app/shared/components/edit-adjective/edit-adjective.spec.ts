import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdjective } from './edit-adjective';

describe('EditAdjective', () => {
  let component: EditAdjective;
  let fixture: ComponentFixture<EditAdjective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdjective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdjective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
