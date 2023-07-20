import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { GiphyApiService } from 'src/app/shared/services/giphy-api.service';

@Component({
  selector: 'app-trending-gifs',
  templateUrl: './trending-gifs.component.html',
  styleUrls: ['./trending-gifs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingGifsComponent implements OnInit {
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private _gifService = inject(GiphyApiService);

  ngOnInit(): void {
    this._gifService.renderTrendingGrid(this.container.nativeElement, {
      columns: 3,
      width: 1080,
      gutter: 20,
    });
  }
}
