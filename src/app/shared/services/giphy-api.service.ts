import { Injectable } from '@angular/core';
import { Grid, renderGrid } from '@giphy/js-components';
import { GifsResult, GiphyFetch, SearchOptions } from '@giphy/js-fetch-api';
import { environment } from 'src/environments/environment';
import { GridOptions } from '../interfaces/giphy.interface';

@Injectable({
  providedIn: 'root',
})
export class GiphyApiService {
  private _gf = new GiphyFetch(environment.giphyKey);

  search(term: string, options?: SearchOptions) {
    console.log('search', term);
    return this._gf.search(term, options);
  }

  renderTrendingGrid(
    element: HTMLElement,
    visibleOptions: GridOptions,
    key = '',
    fetchFn: (offset: number) => Promise<GifsResult> = this._fetchGifs
  ) {
    const options = {
      fetchGifs: fetchFn,
      ...visibleOptions,
      key,
      noResultmessage: 'No results found',
      class: 'messaging_non_clips',
    };

    renderGrid(options, element);

    // renderGrid({
    //   width: options.width,
    //   columns: options.columns,
    //   gutter: options.gutter,
    //   fetchGifs: options.fetchGifs,
    //   noResultsMessage: options.noResultmessage,
    //   hideAttribution: options.hideAttribution,
    //   noLink: options.noLink,
    //   user: {},
    //   bundle
    // }, element)
  }

  removeGrid(element: HTMLElement) {
    const grid = element.querySelector('.giphy-grid');
    grid && grid.remove();
  }

  private _fetchGifs = (offset: number) =>
    this._gf.trending({ offset, limit: 15 });
}
