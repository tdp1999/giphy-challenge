import { Breakpoints } from '@angular/cdk/layout';
import { EBreakPoint } from '../enums/breakpoint.enum';
import { IBreakpoint } from '../interfaces/breakpoint.interface';
import { EGridWidth } from '../enums/grid-width.enum';

export const SUPPORTED_BREAKPOINTS: Record<EBreakPoint, IBreakpoint> = {
  [EBreakPoint.XSmall]: {
    name: EBreakPoint.XSmall,
    mediaQuery: Breakpoints.XSmall,
    gridWidth: EGridWidth.XSmall,
  },
  [EBreakPoint.Small]: {
    name: EBreakPoint.Small,
    mediaQuery: Breakpoints.Small,
    gridWidth: EGridWidth.Small,
  },
  [EBreakPoint.Medium]: {
    name: EBreakPoint.Medium,
    mediaQuery: Breakpoints.Medium,
    gridWidth: EGridWidth.Medium,
  },
  [EBreakPoint.Large]: {
    name: EBreakPoint.Large,
    mediaQuery: Breakpoints.Large,
    gridWidth: EGridWidth.Large,
  },
  [EBreakPoint.XLarge]: {
    name: EBreakPoint.XLarge,
    mediaQuery: Breakpoints.XLarge,
    gridWidth: EGridWidth.XLarge,
  },
};

export const SUPPORTED_BREAKPOINT_QUERIES: string[] = Object.values(
  SUPPORTED_BREAKPOINTS
).map((breakpoint) => '' + breakpoint.mediaQuery);
