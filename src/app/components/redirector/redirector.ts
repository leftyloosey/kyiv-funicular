import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { globalRedirect } from '../../signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-redirector',
  imports: [],
  templateUrl: './redirector.html',
  styleUrl: './redirector.css',
})
export class Redirector implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => this.router.navigate([`${globalRedirect()}`]), 1000);
  }
}
