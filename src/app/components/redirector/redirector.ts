import { Component, inject, signal, effect } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { globalRedirect } from '../../signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-redirector',
  imports: [],
  templateUrl: './redirector.html',
  styleUrl: './redirector.css',
})
export class Redirector {
  private readonly router = inject(Router);

  constructor() {
    setTimeout(() => this.router.navigate([`${globalRedirect()}`]), 600);
  }
}
