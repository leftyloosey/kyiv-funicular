import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangTargetService {
  public target = signal<string>('en');

  public setTarget(newTarget: string): void {
    this.target.set(newTarget);
  }
}
