import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingGifsComponent } from './trending-gifs.component';

const routes: Routes = [
  {
    path: '',
    component: TrendingGifsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrendingGifsRoutingModule {}
