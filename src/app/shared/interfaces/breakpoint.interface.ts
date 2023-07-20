import { EBreakPoint } from '../enums/breakpoint.enum';

export interface IBreakpoint {
  name: EBreakPoint;
  mediaQuery: string;
  gridWidth: number;
}
