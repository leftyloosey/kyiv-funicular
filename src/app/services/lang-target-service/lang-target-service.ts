import { Injectable, signal } from '@angular/core';
import { lngToken } from '../../utils/tokens/language-token';

@Injectable({
  providedIn: 'root',
})
export class LangTargetService {
  public target = signal<lngToken>('en');

  public setTarget(newTarget: lngToken): void {
    this.target.set(newTarget);
  }
}
