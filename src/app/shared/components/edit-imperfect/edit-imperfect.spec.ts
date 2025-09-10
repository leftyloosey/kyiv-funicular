import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImperfect } from './edit-imperfect';

describe('EditImperfect', () => {
  let component: EditImperfect;
  let fixture: ComponentFixture<EditImperfect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditImperfect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImperfect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
