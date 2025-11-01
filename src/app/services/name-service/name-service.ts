import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  public userId: string = '689360ca43f25f4f5d6d9e24';
  public getUser(): string {
    return this.userId;
  }
  public setUser(receivedId: string): void {
    this.userId = receivedId;
  }
}
