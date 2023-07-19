import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingGifsRoutingModule } from './trending-gifs-routing.module';
import { TrendingGifsComponent } from './trending-gifs.component';


@NgModule({
  declarations: [
    TrendingGifsComponent
  ],
  imports: [
    CommonModule,
    TrendingGifsRoutingModule
  ]
})
export class TrendingGifsModule { }
