import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileLayoutService {
  private profileLayout: boolean = false;

  // === get layout functionality ===
  getProfileLayout() {
    return this.profileLayout;
  }

  // === set layout functionality ===
  setProfileLayout(value: boolean) {
    this.profileLayout = value;
  }

  constructor() { }
}
