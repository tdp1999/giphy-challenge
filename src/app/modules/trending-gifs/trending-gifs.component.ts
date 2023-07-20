import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserverService } from 'src/app/shared/services/breakpoint-observer.service';
import { GiphyApiService } from 'src/app/shared/services/giphy-api.service';

@Component({
  selector: 'app-trending-gifs',
  templateUrl: './trending-gifs.component.html',
  styleUrls: ['./trending-gifs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingGifsComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private _gifService = inject(GiphyApiService);
  private _unsubscribe$ = new Subject<void>();
  private _breakpointObserverService = inject(BreakpointObserverService);

  ngOnInit(): void {
    // this._breakpointObserverService.gridWidth$
    //   .pipe(takeUntil(this._unsubscribe$))
    //   .subscribe((value) => {
    //     if (!value) return;

    //     this._gifService.renderTrendingGrid(this.container.nativeElement, {
    //       columns: 3,
    //       width: value,
    //       gutter: 20,
    //     });
    //   });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
