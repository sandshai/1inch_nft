import { Injectable } from '@angular/core';

interface grid {
  [key: string]: any;
  filter: boolean;
  analytics: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GridHandleService {
  private gridLayout: grid = {
    filter: false,
    analytics: true,
  };

  constructor() {}

  getGridLayouts() {
    return this.gridLayout;
  }

  getGridLayout(key: string) {
    return this.gridLayout[key];
  }

  setGridLayout(key: string, value: boolean) {
    this.gridLayout[key] = value;
  }
}
