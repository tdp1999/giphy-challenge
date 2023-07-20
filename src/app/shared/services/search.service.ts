import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchTerm = new Subject<string>();
  public searchTerm$ = this._searchTerm.asObservable();

  search(term: string) {
    this._searchTerm.next(term);
  }
}
