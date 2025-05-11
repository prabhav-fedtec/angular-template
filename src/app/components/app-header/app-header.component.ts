import { Component } from "@angular/core";
import { UsaHeaderModule, UsaHeaderPrimaryLink, UsaNavigationLink, UsaSearchModule } from '@gsa-sam/ngx-uswds';
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { LoginButtonComponent } from "./login-button.component";

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, UsaHeaderModule, UsaSearchModule, LoginButtonComponent],
  template: `
    <usa-header #header 
      [title]="title"
      [navAriaLabel]="navAriaLabel"
      [primaryNavItems]="(authenticated$ | async) ? authNavItems : baseNavItems"
      [secondaryNavItems]="secondaryNavItems"
      [extended]="true"
      [displayOverlayOnMenuOpen]="false"
      (linkEvent)="linkEvent($event)">

      <!-- Add extra content after the secondary navigation link if needed -->
      <ng-container usaHeaderSecondaryExtra>
        <usa-search/>
        <login-button/>
      </ng-container>
    </usa-header>
  `
})
export class AppHeaderComponent {
  httpClient: HttpClient;

  authenticated$: Observable<boolean>;

  title = 'Project Title'

  navAriaLabel = 'Primary Navigation';

  baseNavItems: UsaHeaderPrimaryLink[] = [
    {
      text: 'Current section', 
      id: 'home',
      path: '',
      children: [
        {
          text: 'Navigation Link 0',
          id: 'homeChild0',
          path: '',
        },
      ] 
    }
  ];

  // Authenticated users see extra items
  authNavItems: UsaHeaderPrimaryLink[] = [
    ...this.baseNavItems,
    { text: 'Submit An Expense', id: 'submit-expense' },
    { text: 'Review An Expense', id: 'review-expense' },
  ];

  secondaryNavItems: UsaNavigationLink[] = [
    {
      text: 'Secondary Link',
      id: 'request',
    },
    {
      text: 'Another Secondary Link',
      id: 'messages',
    },
  ];

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient =  httpClient;
    this.authenticated$ = authService.authenticated$;
  }

  linkEvent = ($event: UsaNavigationLink<any>) => {
    console.log($event);
  }
}