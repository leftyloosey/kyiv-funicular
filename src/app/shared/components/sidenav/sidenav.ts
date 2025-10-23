import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SearchAhead } from '../search-ahead/search-ahead';
import { WordBuilder } from '../../../modules/word-builder/word-builder';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    // SearchAhead,
    WordBuilder,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  showFiller = true;
}
