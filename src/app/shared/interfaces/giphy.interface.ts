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
  id: string | number;
  title: string;
  rating: string;
  image: string;
  imageHeight: number;
  imageWidth: number;
  importDate: string | null;
  trendingDate: string | null;
  url: string;
  shortenedUrl: string;
  hasUser: boolean;
  username: string;
  userAvatar: string;
  userDescription: string;
  userVerified: boolean;
  userProfileUrl: string;
  viewCount?: number;
}
