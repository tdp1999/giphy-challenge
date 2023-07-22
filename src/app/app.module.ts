import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './layouts/header/header.module';
import { SearchBarModule } from './shared/components/search-bar/search-bar.module';
import { InfoButtonModule } from './shared/components/info-button/info-button.module';
import { HttpClientModule } from '@angular/common/http';
import { GIF_LIMIT, RELATED_GIF_LIMIT } from './shared/tokens/gif.token';

const components = [
  HeaderModule,
  SearchBarModule,
  InfoButtonModule,
  HttpClientModule,
];

const tokenProviders: Provider[] = [
  {
    provide: GIF_LIMIT,
    useValue: 15,
  },
  {
    provide: RELATED_GIF_LIMIT,
    useValue: 4,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...components,
  ],
  providers: [...tokenProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
