import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Translate } from './translate';
import { CommonModule } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('Translate', () => {
  let component: Translate;
  let fixture: ComponentFixture<Translate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Translate, CommonModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Translate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
