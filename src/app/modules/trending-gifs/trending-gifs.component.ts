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
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IGif } from '@giphy/js-types';
import { Subject, combineLatest, startWith, takeUntil, tap } from 'rxjs';
import { GifsInfoComponent } from 'src/app/shared/components/gifs-info/gifs-info.component';
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

  searchValue = '';

  private _router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);
  private _dialog = inject(MatDialog);
  private _gifService = inject(GiphyApiService);
  private _searchService = inject(SearchService);
  private _activatedRoute = inject(ActivatedRoute);
  private _unsubscribe = new Subject<void>();
  private _breakpointObserverService = inject(BreakpointObserverService);

  ngOnInit(): void {
    const { queryParams } = this._activatedRoute.snapshot;

    combineLatest([
      this._breakpointObserverService.gridWidth$,
      this._searchService.searchTerm$.pipe(
        startWith(queryParams['q'] || ''),
        tap((value) => this.setSearchQuery(value))
      ),
    ])
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe(([width, term]) => {
        if (!width || (!term && term !== '')) return;

        this.searchValue = term;

        this._gifService.removeGrid(this.container.nativeElement);

        this._gifService.renderTrendingGrid(
          this.container.nativeElement,
          {
            columns: 3,
            width,
            gutter: 20,
            onGifHover: this.onGifHover.bind(this),
            onGifClick: this.onGifClick.bind(this),
          },
          term,
          term !== ''
            ? (offset) => this._gifService.search(term, { offset, limit: 15 })
            : undefined
        );
        this._cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onGifHover(gif: IGif, e: Event) {
    console.log('gif', gif);
  }

  onGifClick(gif: IGif, e: Event) {
    e.preventDefault();
    console.log('gif clicked', gif);

    this._dialog.open(GifsInfoComponent, {
      data: { gif },
      panelClass: 'default-dialog-class',
    });
  }

  setSearchQuery(value: string) {
    const query: Params = !!value.trim() ? { q: value.trim() } : {};
    this._selfNavigate(query);
  }

  private _selfNavigate(query: Params = {}) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: query,
      queryParamsHandling: '',
    });
  }
}
