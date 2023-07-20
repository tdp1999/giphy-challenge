import { Injectable } from '@angular/core';
import { Grid, renderGrid } from '@giphy/js-components';
import { GiphyFetch, SearchOptions } from '@giphy/js-fetch-api';
import { environment } from 'src/environments/environment';
import { GridOptions } from '../interfaces/giphy.interface';

@Injectable({
  providedIn: 'root',
})
export class GiphyApiService {
  private _gf = new GiphyFetch(environment.giphyKey);

  search(term: string, options?: SearchOptions) {
    return this._gf.search(term, options);
  }

  renderTrendingGrid(element: HTMLElement, visibleOptions: GridOptions) {
    const options = {
      fetchGifs: this._fetchGifs,
      user: {},
      ...visibleOptions,
    };

    renderGrid(options, element);
  }

  private _fetchGifs = (offset: number) =>
    this._gf.trending({ offset, limit: 10 });
}
