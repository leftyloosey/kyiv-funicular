import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionEdit } from './definition-edit';

describe('DefinitionEdit', () => {
  let component: DefinitionEdit;
  let fixture: ComponentFixture<DefinitionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefinitionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinitionEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
