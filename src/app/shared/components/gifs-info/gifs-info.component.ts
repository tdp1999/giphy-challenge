import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGif } from '@giphy/js-types';
import { GifDetails } from '../../interfaces/giphy.interface';
import { DATE_TIME_FORMAT } from '../../constants/datetime.constant';
import { UtilService } from '../../services/util.service';
import { Observable } from 'rxjs';
import { GifsResult } from '@giphy/js-fetch-api';

@Component({
  selector: 'app-gifs-info',
  templateUrl: './gifs-info.component.html',
  styleUrls: ['./gifs-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsInfoComponent implements OnInit {
  @ViewChild('mainGifRef') image?: ElementRef<HTMLImageElement>;

  private _data: {
    gif: IGif;
    additionalData?: Partial<GifDetails>;
    getRelatedGifs?: (
      id: string | number | undefined
    ) => Observable<GifsResult | null>;
  } = inject(MAT_DIALOG_DATA);
  private _utilService = inject(UtilService);
  private _cdr = inject(ChangeDetectorRef);

  public relatedGifs: IGif[] = [];
  public dateFormat = DATE_TIME_FORMAT.date;
  public dateTimeFormat = DATE_TIME_FORMAT.datetime;
  public gif: GifDetails | null = null;
  public bottomSheetRef = inject(MatDialogRef<GifsInfoComponent>);

  ngOnInit(): void {
    this.gif = {} as GifDetails;
    this._mappingGifDetails(this.gif, this._data.gif);
    this.gif = { ...this.gif, ...this._data.additionalData };
    if (this._data.getRelatedGifs) {
      this._data.getRelatedGifs(this.gif.id).subscribe((result) => {
        this.relatedGifs = result?.data || [];
        this._cdr.markForCheck();
      });
    }
    console.log(this.gif);
  }

  onSelectGif(gif: IGif): void {
    this.image?.nativeElement.classList.add('loading');
    this.gif = {} as GifDetails;
    this._mappingGifDetails(this.gif, gif);

    if (this._data.getRelatedGifs) {
      this._data.getRelatedGifs(gif.id).subscribe((result) => {
        this.relatedGifs = result?.data || [];
        this._cdr.markForCheck();
      });
    }
  }

  onLoadFinished(image: HTMLImageElement): void {
    image.classList.remove('loading');
    this._cdr.markForCheck();
  }

  private _mappingGifDetails(gif: GifDetails, source: IGif): void {
    console.log('source', source);
    gif.id = source.id;
    gif.title = source.title;
    gif.rating = source.rating;
    gif.image = this._utilService.decideImageUrl(source.images);
    gif.imageHeight = source.images.original.height;
    gif.imageWidth = source.images.original.width;
    gif.importDate = this._utilService.validDate(source.import_datetime)
      ? source.import_datetime
      : null;
    gif.trendingDate = this._utilService.validDate(source.trending_datetime)
      ? source.trending_datetime
      : null;
    gif.url = source.url;
    gif.shortenedUrl = source.bitly_url;
    gif.hasUser = !!source.user;
    gif.username = source.user?.display_name;
    gif.userAvatar = source.user?.avatar_url;
    gif.userVerified = source.user?.is_verified;
  }
}
