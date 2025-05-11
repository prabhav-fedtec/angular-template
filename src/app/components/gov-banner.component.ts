import { Component } from '@angular/core';

@Component({
  selector: 'gov-banner',
  template: `
    <section class="usa-banner" data-testid="govBanner" aria-label="Official website of the United States government">
      <div class="usa-accordion">
        <header class="usa-banner__header">
          <div class="usa-banner__inner" data-testid="banner-header-inner-div">
            <div class="grid-col-auto" data-testid="banner-header-flag-div">
              <img class="usa-banner__header-flag" alt="" src="gov-banner-flag.png" aria-hidden="true">
            </div>
            <div class="grid-col-fill tablet:grid-col-auto" aria-hidden="true" data-testid="banner-header-grid-div">
              <p class="usa-banner__header-text">An official website of the United States government</p>
              <p class="usa-banner__header-action" aria-hidden="true">Here’s how you know</p>
            </div>
            <button type="button" class="usa-accordion__button usa-banner__button" aria-expanded="false" aria-controls="gov-banner">
              <span class="usa-banner__button-text">Here’s how you know</span>
            </button>
          </div>
        </header>
        <div class="usa-banner__content usa-accordion__content" id="gov-banner" hidden="">
          <div class="grid-row grid-gap-lg">
            <div class="usa-banner__guidance tablet:grid-col-6">
              <img class="usa-banner__icon usa-media-block__img" src="gov-banner-building.svg" alt="" aria-hidden="true">
              <div class="usa-media-block__body">
                <p><strong>Official websites use .gov</strong><br>A <strong>.gov</strong> website belongs to an official government organization in the United States.</p>
              </div>
            </div>
            <div class="usa-banner__guidance tablet:grid-col-6">
              <img class="usa-banner__icon usa-media-block__img" src="gov-banner-lock.svg" alt="" aria-hidden="true">
              <div class="usa-media-block__body"><p><strong>Secure .gov websites use HTTPS</strong><br>A <strong>lock (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="usa-icon" focusable="false" role="img" aria-label="Locked padlock icon"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></svg>)</strong> or <strong>https://</strong> means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class GovBannerComponent {}
