import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form';
import { CommonModule } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('CommentForm', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentFormComponent, CommonModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
