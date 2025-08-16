import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyComment } from './reply-comment';

describe('ReplyComment', () => {
  let component: ReplyComment;
  let fixture: ComponentFixture<ReplyComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
