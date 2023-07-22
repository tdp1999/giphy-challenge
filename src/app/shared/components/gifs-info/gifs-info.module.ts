import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsInfoComponent } from './gifs-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';

const components = [
  MatIconModule,
  MatDialogModule,
  MatTooltipModule,
  ClipboardModule,
];

@NgModule({
  declarations: [GifsInfoComponent],
  imports: [CommonModule, ...components],
  exports: [GifsInfoComponent],
})
export class GifsInfoModule {}
