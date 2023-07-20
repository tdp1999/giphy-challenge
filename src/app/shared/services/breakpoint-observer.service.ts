import { Injectable, inject } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private _breakpointObserver = inject(BreakpointObserver);

}