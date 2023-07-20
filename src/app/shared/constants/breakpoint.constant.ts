import { Breakpoints } from '@angular/cdk/layout';
import { EBreakPoint } from '../enums/breakpoint.enum';
import { IBreakpoint } from '../interfaces/breakpoint.interface';

export const SUPPORTED_BREAKPOINTS: Record<EBreakPoint, IBreakpoint> = {
  [EBreakPoint.XSmall]: {
    name: EBreakPoint.XSmall,
    mediaQuery: Breakpoints.XSmall,
    gridWidth: 480,
  },
  [EBreakPoint.Small]: {
    name: EBreakPoint.Small,
    mediaQuery: Breakpoints.Small,
    gridWidth: 560,
  },
  [EBreakPoint.Medium]: {
    name: EBreakPoint.Medium,
    mediaQuery: Breakpoints.Medium,
    gridWidth: 840,
  },
  [EBreakPoint.Large]: {
    name: EBreakPoint.Large,
    mediaQuery: Breakpoints.Large,
    gridWidth: 1080,
  },
  [EBreakPoint.XLarge]: {
    name: EBreakPoint.XLarge,
    mediaQuery: Breakpoints.XLarge,
    gridWidth: 1280,
  },
};

export const SUPPORTED_BREAKPOINT_QUERIES: string[] = Object.values(
  SUPPORTED_BREAKPOINTS
).map((breakpoint) => '' + breakpoint.mediaQuery);
