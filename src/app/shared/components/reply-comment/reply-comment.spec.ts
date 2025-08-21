import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyComment } from './reply-comment';
import { CommonModule } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('ReplyComment', () => {
  let component: ReplyComment;
  let fixture: ComponentFixture<ReplyComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyComment, CommonModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReplyComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
