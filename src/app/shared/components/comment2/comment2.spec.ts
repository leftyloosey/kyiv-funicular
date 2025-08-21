import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comment2 } from './comment2';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { inputBinding, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('Comment2', () => {
  let component: Comment2;
  let fixture: ComponentFixture<Comment2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comment2, CommonModule, AsyncPipe, DatePipe],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Comment2, {
      bindings: [inputBinding('comment', () => 'value')],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
