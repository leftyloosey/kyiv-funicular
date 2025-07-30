import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverComponent as Receiver } from './receiver';

describe('Receiver', () => {
  let component: Receiver;
  let fixture: ComponentFixture<Receiver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Receiver],
    }).compileComponents();

    fixture = TestBed.createComponent(Receiver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
