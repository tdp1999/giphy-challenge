import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGif } from '@giphy/js-types';
import { GifDetails } from '../../interfaces/giphy.interface';

@Component({
  selector: 'app-gifs-info',
  templateUrl: './gifs-info.component.html',
  styleUrls: ['./gifs-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsInfoComponent implements OnInit {
  private _data: { gif: IGif } = inject(MAT_DIALOG_DATA);

  public gif: Record<keyof GifDetails, any> | null = null;
  public bottomSheetRef = inject(MatDialogRef<GifsInfoComponent>);

  ngOnInit(): void {
    this.gif = {} as GifDetails;
    this._mappingGifDetails(this.gif, this._data.gif);
  }

  private _mappingGifDetails(
    gif: Record<keyof GifDetails, any>,
    source: IGif
  ): void {
    gif.id = source.id;
    gif.title = source.title;
    gif.rating = source.rating;
    gif.image = source.images.original.url;
    gif.imageHeight = source.images.original.height;
    gif.imageWidth = source.images.original.width;
    gif.username = source.user.display_name;
    gif.userAvatar = source.user.avatar_url;
  }
}
