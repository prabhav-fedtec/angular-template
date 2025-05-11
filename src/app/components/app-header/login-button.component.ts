import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { first, map, Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'login-button',
  imports: [AsyncPipe],
  template: `
    @if (authenticated$ | async) {
      <button type="button" class="usa-button" (click)="logout()" [style]="buttonStyle">
        Log Out
      </button>
    } @else {
      <a href="/oauth2/authorization/default" class="usa-button" [style]="buttonStyle">
        Sign In
      </a>
    }
  `
})
export class LoginButtonComponent {
  httpClient: HttpClient;

  authenticated$: Observable<boolean>;

  buttonStyle = {
    textWrap: "nowrap",
    marginTop: "0px",
    height: "2rem",
    paddingTop: "8px",
    marginRight: "0px",
    marginLeft: "0px",
  }

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient =  httpClient;
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
