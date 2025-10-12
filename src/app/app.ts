import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingIndicator } from './shared/components/loading-indicator/loading-indicator';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, LoadingIndicator],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
