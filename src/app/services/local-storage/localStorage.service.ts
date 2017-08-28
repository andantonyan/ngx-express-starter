import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ILocalStorageService {
  setItem(key: string, value: any): void;
  getItem(key: string): any;
}

@Injectable()
export class LocalStorage implements ILocalStorageService {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object) {}

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string): void {
    let result;
    if (isPlatformBrowser(this.platformId)) {
      result = JSON.parse(localStorage.getItem(result));
    }

    return result;
  }

}
