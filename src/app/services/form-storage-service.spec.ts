import { TestBed } from '@angular/core/testing';

import { FormStorageService } from './form-storage-service';
import { CommonModule } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('FormStorageService', () => {
  let service: FormStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
      ],
    });
    service = TestBed.inject(FormStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
// import { provideHttpClient } from '@angular/common/http';
// import {
//   HttpTestingController,
//   provideHttpClientTesting,
// } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormStorageService } from './form-storage-service';

// describe('FormStorageService', () => {
//   let component: FormStorageService;
//   let fixture: ComponentFixture<FormStorageService>;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [FormStorageService],
//       // providers: [
//       //   provideHttpClient(),
//       //   provideHttpClientTesting(),

//       //   provideRouter([]),

//       //   provideStore(),
//       //   provideState(bookingFeature),
//       //   provideEffects(BookingEffects),
//       // ],
//     }).compileComponents();
//     TestBed.inject(FormStorageService);
//     fixture = TestBed.createComponent(FormStorageService);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   it('should be created', () => {
//     expect(fixture).toBeTruthy();
//   });
//   // it('should search for flights', () => { […] });
// });
