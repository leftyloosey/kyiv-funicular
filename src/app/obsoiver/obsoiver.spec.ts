import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Obsoiver } from './obsoiver';

describe('Obsoiver', () => {
  let component: Obsoiver;
  let fixture: ComponentFixture<Obsoiver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Obsoiver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Obsoiver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
