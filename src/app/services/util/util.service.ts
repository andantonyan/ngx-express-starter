import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  static getCurrentDevice(): 'MOBILE' | 'TABLET' | 'DESKTOP' {
    let type;
    if (window.matchMedia('(max-width: 480px)').matches) {
      type = 'MOBILE';
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
      type = 'TABLET';
    } else {
      type = 'DESKTOP';
    }

    return type;
  }

  static getRouteDataByKey(activatedRoute, key: string): any {
    return activatedRoute.snapshot.data[key] ||
      (activatedRoute.snapshot.children.length && activatedRoute.snapshot.children[0].data[key]);
  }
  constructor() {}
}
