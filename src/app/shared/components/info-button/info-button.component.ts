import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoButtonComponent {
  @ViewChild(TemplateRef) template!: TemplateRef<any>;

  private _dialog = inject(MatDialog);

  showInfo() {
    this._dialog.open(this.template, {
      panelClass: 'info-dialog',
    });
  }
}
