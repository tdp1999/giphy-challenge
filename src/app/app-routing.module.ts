import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'trending-gifs',
    loadChildren: () =>
      import('./modules/trending-gifs/trending-gifs.module').then(
        (m) => m.TrendingGifsModule
      ),
  },
  {
    path: '',
    redirectTo: 'trending-gifs',
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./modules/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: '**',
    redirectTo: 'trending-gifs',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
