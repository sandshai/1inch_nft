import { Injectable } from '@angular/core';

interface Settings {
  [key: string]: any;
  maxResults: number;
  theme: string;
}

interface ChainURL {
  [key: string]: any;
  ethereum: string;
  polygon: string;
  global: string;
  // Arbitrum: string;
  // Optimism: string;
}

interface ChainHeader {
  [key: string]: any;
  ethereum: string;
  polygon: string;
  // global: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private isDarkTheme = true;
  private settings: Settings = {
    maxResults: 20,
    theme: '',
  };

  private chainURL: ChainURL = {
    ethereum: 'https://api.reservoir.tools/',
    polygon: 'https://api-polygon.reservoir.tools/',
    global: 'https://marketplace.reservoir.tools/',

    // Arbitrum: 'https://api-arbitrum.reservoir.tools/',
    // Optimism: 'https://api-optimism.reservoir.tools/',
  };

  private chainHeader: ChainHeader = {
    ethereum: 'bb7ce436-9058-5592-87ad-f0e61ffa0de6',
    polygon: '90483aa0-4ca2-500b-8255-82c58ee7faa2',
    //   api_key_arbitrum: ea3f6774-b980-5397-ae20-4471e9e8ceac,
    //   api_key_optimism:3dc9e4d0-d031-5d52-a3b1-ce7a8b029e6a
  };

  public baseUrl: string = this.chainURL['ethereum'];
  public baseHeader: string = this.chainHeader[`ethereum`];

  getSettings() {
    return this.settings;
  }

  getSetting(key: string) {
    return this.settings[key];
  }

  setSetting(key: string, value: any) {
    this.settings[key] = value;
  }

  getThemeClass() {
    return !this.isDarkTheme ? 'light-theme' : '';
  }

  toggleTheme(value: any) {
    this.isDarkTheme = value == 'light' ? false : true;
    this.setSetting('theme', this.getThemeClass());
    document.body.className = this.getThemeClass();
  }

  changeChainURL(key: string) {
    this.baseUrl = this.chainURL[key];
  }

  changeChainHeader(key: string) {
    this.baseHeader = this.chainHeader[key];
  }
}
