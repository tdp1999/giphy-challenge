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
import { MatTooltip } from '@angular/material/tooltip';

interface GifsInfoData {
  gif: IGif;
  additionalData?: Partial<GifDetails>;
  getRelatedGifs?: (
    id: string | number | undefined
  ) => Observable<GifsResult | null>;
}

@Component({
  selector: 'app-gifs-info',
  templateUrl: './gifs-info.component.html',
  styleUrls: ['./gifs-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsInfoComponent implements OnInit {
  @ViewChild('mainGifRef') image?: ElementRef<HTMLImageElement>;
  @ViewChild(MatTooltip, { read: MatTooltip }) tooltip?: MatTooltip;

  public copied = false;
  public dateFormat = DATE_TIME_FORMAT.date;
  public dateTimeFormat = DATE_TIME_FORMAT.datetime;
  public bottomSheetRef = inject(MatDialogRef<GifsInfoComponent>);
  public relatedGifs: IGif[] = [];
  public gif: GifDetails | null = null;

  private _cdr = inject(ChangeDetectorRef);
  private _utilService = inject(UtilService);
  private _data: GifsInfoData = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this._loadGif(this._data.gif);
  }

  onSelectGif(gif: IGif): void {
    this.image?.nativeElement.classList.add('loading');
    this._loadGif(gif);
  }

  onLoadFinished(image: HTMLImageElement): void {
    image.classList.remove('loading');
    this._cdr.markForCheck();
  }

  onCopyLink() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
      this._cdr.markForCheck();
    }, 1000);
  }

  private _loadGif(source: IGif) {
    this.gif = this._mappingGifDetails(source);
    this.gif = { ...this.gif, ...this._data.additionalData };
    if (!this._data.getRelatedGifs) return;

    this._data.getRelatedGifs(this.gif.id).subscribe((result) => {
      this.relatedGifs = result?.data || [];
      this._cdr.markForCheck();
    });
  }

  private _mappingGifDetails(source: IGif): GifDetails {
    const gif = {} as GifDetails;

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

    return gif;
  }
}
