import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SearchService } from './shared/services/search.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(SearchBarComponent, { static: true })
  searchBar!: SearchBarComponent;

  @HostListener('window:keydown', ['$event']) onSearchFocus(
    event: KeyboardEvent
  ) {
    if (event.key !== '/') return;
    event.preventDefault();
    this.searchBar.focus();
  }

  public searchService = inject(SearchService);

  private _activatedRoute = inject(ActivatedRoute);
  private _unsubscribe = new Subject<void>();

  initialQuery = '';

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((params) => {
        this.initialQuery = params['q'] || '';
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
