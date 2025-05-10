import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  template: `
    <div>
      @if (authenticated$ | async; as authenticated) {
        <h1>Expense Service Response: /expenses/user</h1>
        @if (expenses$ | async; as expenses) {
          <pre>{{ expenses | json }}</pre>
        } @else {
          <p>Error :(</p>
        }
        <button (click)="logout()">Logout</button>
      } @else {
        <a href="/oauth2/authorization/default">
          <button>Sign In</button>
        </a>
      }
    </div>

    <router-outlet/>
  `
})
export class AppComponent {
  private httpClient: HttpClient;

  title = 'angular-template';

  expenses$!: Observable<any>;

  authenticated$: Observable<boolean>;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.authenticated$ = authService.authenticated$;
  }

  ngOnInit(): void {
    this.expenses$ = this.httpClient.get<any>('/api/expenses/user', {responseType: 'json', withCredentials: true})
  }

  logout(): void {
    this.httpClient.post<any>('/logout', {}, {withCredentials: true})
      .pipe(first())
      .pipe(map(resp => {
        let logoutUri = resp.headers.get('Location')
        console.log(logoutUri)

        if (logoutUri == null) {
          throw new Error('API Gateway responded with null logout URI')
        }

        return logoutUri
      })).subscribe({
        next: (logoutUri) => {
          window.location.href = logoutUri
        },
        error: (e) => {
          console.error(e)
        }
      })
  }
}
