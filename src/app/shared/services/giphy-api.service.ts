import { Injectable, inject } from '@angular/core';
import { Grid, renderGrid } from '@giphy/js-components';
import {
  GifsResult,
  GiphyFetch,
  RelatedOptions,
  SearchOptions,
} from '@giphy/js-fetch-api';
import { environment } from 'src/environments/environment';
import { GridOptions } from '../interfaces/giphy.interface';
import { from } from 'rxjs';
import { GifID } from '@giphy/js-types';
import { HttpClient } from '@angular/common/http';
import { GIF_LIMIT, RELATED_GIF_LIMIT } from '../components/tokens/gif.token';

@Injectable({
  providedIn: 'root',
})
export class GiphyApiService {
  private _giphyKey = environment.giphyKey;
  private _gf = new GiphyFetch(this._giphyKey);
  private _httpClient = inject(HttpClient);

  private _limit = inject(GIF_LIMIT);
  private _relatedLimit = inject(RELATED_GIF_LIMIT);

  get(id: GifID) {
    return from(this._gf.gif('' + id));
  }

  search(term: string, options?: SearchOptions) {
    return this._gf.search(term, options);
  }

  related(
    id: string,
    options: RelatedOptions = { type: 'gifs', limit: this._relatedLimit }
  ) {
    return from(this._gf.related(id, options));
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
      noResultsMessage: 'No results found',
      class: 'messaging_non_clips',
    };

    renderGrid(options, element);
  }

  removeGrid(element: HTMLElement) {
    const grid = element.querySelector('.giphy-grid');
    grid && grid.remove();
  }

  private _fetchGifs = (offset: number) =>
    this._gf.trending({ offset, limit: this._limit });
}
