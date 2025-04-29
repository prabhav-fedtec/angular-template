import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { first, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-template';

  expenses$!: Observable<any>;

  httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {
    this.expenses$ = this.httpClient.get<any>('/api/expenses', {responseType: 'json', withCredentials: true})
  }

  logout(): void {
    this.httpClient.post<any>('/logout', {}, {withCredentials: true, observe: 'response'})
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
