import { IGif } from '@giphy/js-types';

export interface GridOptions {
  columns: number;
  width: number;
  gutter: number;
  noResultsMessage?: string;
  noLink?: boolean;
  hideAttribution?: boolean;
  onGifHover?: (gif: IGif, e: Event) => void;
  onGifClick?: (gif: IGif, e: Event) => void;
}
export interface GifDetails {
  id: string;
  title: string;
  rating: string;
  image: string;
  imageHeight: string;
  imageWidth: string;
  username: string;
  userAvatar: string;
  userDescription: string;
}
