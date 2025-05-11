import { Component } from '@angular/core';

@Component({
  selector: 'gov-banner',
  template: `
    <header class="usa-banner" aria-label="Official website of the United States government">
      <div class="usa-banner__inner">
        <div class="grid-row">
          <div class="grid-col-auto">
            <span class="usa-banner__header-symbol">🔒</span>
          </div>
          <div class="grid-col-fill">
            <p class="usa-banner__header-text">
              <strong>Official websites use .gov</strong><br>
              A <strong>.gov</strong> website belongs to an official government organization.
            </p>
          </div>
        </div>
        <button type="button"
                class="usa-banner__button usa-accordion__button"
                [attr.aria-expanded]="expanded"
                (click)="expanded = !expanded">
          Here’s how you know
        </button>
        <div id="gov-banner-default"
            class="usa-banner__content usa-accordion__content"
            [hidden]="!expanded">
          <p>
            A lock (🔒) or https:// means you’ve safely connected to the .gov website.
          </p>
        </div>
      </div>
    </header>
  `
})
export class GovBannerComponent {
  expanded = false;
}
