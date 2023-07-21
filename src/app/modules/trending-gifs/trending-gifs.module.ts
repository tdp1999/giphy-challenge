import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { GifsInfoModule } from 'src/app/shared/components/gifs-info/gifs-info.module';
import { TrendingGifsRoutingModule } from './trending-gifs-routing.module';
import { TrendingGifsComponent } from './trending-gifs.component';
import { MatIconModule } from '@angular/material/icon';

const components = [MatDialogModule, GifsInfoModule, MatIconModule];

@NgModule({
  declarations: [TrendingGifsComponent],
  imports: [CommonModule, TrendingGifsRoutingModule, ...components],
})
export class TrendingGifsModule {}
