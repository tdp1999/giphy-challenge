import { EBreakPoint } from '../enums/breakpoint.enum';
import { EGridWidth } from '../enums/grid-width.enum';

export interface IBreakpoint {
  name: EBreakPoint;
  mediaQuery: string;
  gridWidth: EGridWidth;
}
