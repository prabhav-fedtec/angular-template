import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevTokenService {
  private httpClient: HttpClient;

  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  loadToken(): Observable<void> {
    return this.httpClient.get<{access_token:string}>('/dev-token.json')
      .pipe(
        tap(data => this.tokenSubject.next(data.access_token)),
        map(() => void 0),
        catchError(() => of(void 0))
      );
  }

  getToken(): string|null {
    return this.tokenSubject.value;
  }
}
