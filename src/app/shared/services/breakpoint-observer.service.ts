import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  SUPPORTED_BREAKPOINTS,
  SUPPORTED_BREAKPOINT_QUERIES,
} from '../constants/breakpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private _breakpointObserver = inject(BreakpointObserver);

  public gridWidth$: Observable<number | null> = this._breakpointObserver
    .observe(SUPPORTED_BREAKPOINT_QUERIES)
    .pipe(
      map((breakpointState: BreakpointState) => {
        if (!breakpointState.matches) return null;

        const matchedBreakpointQuery = SUPPORTED_BREAKPOINT_QUERIES.find(
          (breakpointName) => breakpointState.breakpoints[breakpointName]
        );

        const matchedBreakpoint = Object.values(SUPPORTED_BREAKPOINTS).find(
          (breakpoint) => breakpoint.mediaQuery === matchedBreakpointQuery
        )?.name;

        return matchedBreakpoint
          ? SUPPORTED_BREAKPOINTS[matchedBreakpoint].gridWidth
          : null;
      })
    );
}
