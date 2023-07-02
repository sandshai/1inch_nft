import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private _http: HttpClient, private _settings: SettingsService) {}

  create(endpoint: string, data: any): Observable<any> {
    const url = this.getUrl(endpoint);
    return this._http.post(url, data);
  }

  read(endpoint: string, id: number): Observable<any> {
    const url = this.getUrl(endpoint, id);
    return this._http.get(url);
  }

  update(endpoint: string, id: number, data: any): Observable<any> {
    const url = this.getUrl(endpoint, id);
    return this._http.put(url, data);
  }

  delete(endpoint: string, id: number): Observable<any> {
    const url = this.getUrl(endpoint, id);
    return this._http.delete(url);
  }

  getAll(endpoint: string, search: boolean): Observable<any> {
    const url = this.getUrl(endpoint);
    if (search) {
      return this._http.get(url);
    } else {
      return this._http.get(url, {
        headers: {
          'x-api-key': this._settings.baseHeader,
        },
      });
    }
  }

  getByFilter(endpoint: string, filter: any): Observable<any> {
    const url = this.getUrl(endpoint, undefined, filter);
    return this._http.get(url);
  }

  private getUrl(endpoint?: string, id?: number, filter?: any): string {
    let url = this._settings.baseUrl;

    if (endpoint) {
      url += endpoint;
      if (id) {
        url += `/${id}`;
      }

      if (filter) {
        url += `?filter=${filter}`;
      }
    }
    return url;
  }
}
