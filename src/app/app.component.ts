import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { GovBannerComponent } from "./components/gov-banner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GovBannerComponent],
  template: `
    <gov-banner/>

    <router-outlet/>
  `
})
export class AppComponent {
  private httpClient: HttpClient;

  authenticated$: Observable<boolean>;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.authenticated$ = authService.authenticated$;
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
