import { Injectable } from "@angular/core";
import { DevTokenService } from "./dev-token.service";
import { UserProfile } from "../../types/profile";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient;

  private devTokenService: DevTokenService;

  private authenticated = new BehaviorSubject<boolean>(false);

  private userProfile = new BehaviorSubject<UserProfile | null>(null);

  readonly authenticated$ = this.authenticated.asObservable();

  readonly userProfile$ = this.userProfile.asObservable();

  constructor(httpClient: HttpClient, devTokenService: DevTokenService) {
    this.httpClient = httpClient;
    this.devTokenService = devTokenService;
    this.init();
  }

  private init(): void {
    const token = this.devTokenService.getToken();

    if (!token) {
      this.httpClient.get<UserProfile>("/api/me", { withCredentials: true })
      .subscribe({
        next: (userProfile) => {
          this.authenticated.next(true);
          this.userProfile.next(userProfile);
        },
        error: (err) => console.error('Error retrieving UserProfile', err)
      });
    } else {
      this.authenticated.next(true);
      this.userProfile.next({
        firstName: "test",
        lastName: "tester",
        userName: "test",
        email: "test@example.com",
      });
    }
  }
}
