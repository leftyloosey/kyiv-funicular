import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Redirector } from './redirector';

describe('Redirector', () => {
  let component: Redirector;
  let fixture: ComponentFixture<Redirector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Redirector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Redirector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
