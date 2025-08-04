import { jwtDecode } from 'jwt-decode';
import { UserPayload } from '../interfaces/jwt';
import { userNameSignal } from '../signals';
import { effect } from '@angular/core';

export class Token {
  private jwtValue;
  static jwtKey = 'JWT';
  private decoded: UserPayload = {};
  private userName = '';
  private userId = '';

  public constructor(value: object) {
    console.log('new token');
    this.jwtValue = value;
    this.saveJWT(value);
    const toDecode = JSON.stringify(this.jwtValue);
    this.decodeJWT(toDecode);
    console.log('name is: ', this.getUsername());
    console.log('user is: ', this.getUserId());
    userNameSignal.set(this.userName);

    // effect(() => {
    // });
    if (this.isExpired()) this.decoded = {};
  }

  public getUsername(): {} {
    return this.userName;
  }
  private setUsername(name: string) {
    this.userName = name;
  }

  static getJwtKey(): {} {
    return this.jwtKey;
  }

  private setUserId(userId: string) {
    this.userId = userId;
  }
  public getUserId(): string {
    return this.userId;
  }

  public isExpired(): boolean {
    if (!this.decoded.exp) {
      this.setUsername('');
      return true;
    }

    try {
      const currentTime = Date.now() / 1000;
      if (this.decoded.exp) return this.decoded.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
    return true;
  }
  private decodeJWT(jwtValue: string) {
    try {
      this.decoded = jwtDecode(jwtValue);
      if (this.decoded.userName && !this.isExpired())
        this.setUsername(this.decoded.userName);
      if (this.decoded.userId && !this.isExpired())
        this.setUserId(this.decoded.userId);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.setUsername('');
    }
  }
  private saveJWT(data: object) {
    localStorage.setItem(Token.jwtKey, JSON.stringify(data));
  }
}
