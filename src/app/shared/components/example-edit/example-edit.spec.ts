import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleEdit } from './example-edit';

describe('ExampleEdit', () => {
  let component: ExampleEdit;
  let fixture: ComponentFixture<ExampleEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
