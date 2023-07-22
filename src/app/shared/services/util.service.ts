import { Injectable } from '@angular/core';
import { IGif } from '@giphy/js-types';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  validDate(date: string): boolean {
    return new Date(date).toString() !== 'Invalid Date';
  }

  decideImageUrl(image: IGif['images']): string {
    let url = image.original.url;

    if (!image.original.size || +image.original?.size > 2000000)
      url = image.original.webp;

    return url;
  }
}
