import { Component, inject } from '@angular/core';
import { SearchService } from './shared/services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public searchService = inject(SearchService);
}
