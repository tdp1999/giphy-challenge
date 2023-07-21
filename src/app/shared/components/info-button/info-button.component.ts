import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoButtonComponent {

  private _dialog = inject(MatDialog);

  showInfo() {
    console.log('show info');
  }
}
