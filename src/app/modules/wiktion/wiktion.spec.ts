import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wiktion } from './wiktion';

describe('Wiktion', () => {
  let component: Wiktion;
  let fixture: ComponentFixture<Wiktion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wiktion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wiktion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
