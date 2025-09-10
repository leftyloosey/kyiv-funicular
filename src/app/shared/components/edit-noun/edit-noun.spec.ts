import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoun } from './edit-noun';

describe('EditNoun', () => {
  let component: EditNoun;
  let fixture: ComponentFixture<EditNoun>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNoun]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNoun);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
