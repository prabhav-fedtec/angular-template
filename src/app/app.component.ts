import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GovBannerComponent } from "./components/gov-banner.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GovBannerComponent, AppHeaderComponent],
  template: `
    <gov-banner/>
    <app-header/>

    <router-outlet/>
  `
})
export class AppComponent {}
