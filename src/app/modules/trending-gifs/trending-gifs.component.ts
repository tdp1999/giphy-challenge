import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Subject, combineLatest, startWith, takeUntil, tap } from 'rxjs';
import { BreakpointObserverService } from 'src/app/shared/services/breakpoint-observer.service';
import { GiphyApiService } from 'src/app/shared/services/giphy-api.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-trending-gifs',
  templateUrl: './trending-gifs.component.html',
  styleUrls: ['./trending-gifs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingGifsComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  // private _cdr = inject(ChangeDetectorRef);
  private _gifService = inject(GiphyApiService);
  private _searchService = inject(SearchService);
  private _unsubscribe = new Subject<void>();
  private _breakpointObserverService = inject(BreakpointObserverService);

  ngOnInit(): void {
    combineLatest([
      this._breakpointObserverService.gridWidth$,
      this._searchService.searchTerm$.pipe(startWith('')),
    ])
      .pipe(
        tap(([width, term]) => console.log(width, term)),
        takeUntil(this._unsubscribe)
      )
      .subscribe(([width, term]) => {
        if (!width || (!term && term !== '')) return;

        this._gifService.removeGrid(this.container.nativeElement);

        this._gifService.renderTrendingGrid(
          this.container.nativeElement,
          {
            columns: 3,
            width,
            gutter: 20,
          },
          term,
          term !== ''
            ? (offset) => this._gifService.search(term, { offset, limit: 15 })
            : undefined
        );
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
