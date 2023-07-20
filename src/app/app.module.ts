import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './layouts/header/header.module';
import { SearchBarModule } from './shared/components/search-bar/search-bar.module';

const components = [HeaderModule, SearchBarModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...components,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
