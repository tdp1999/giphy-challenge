import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoButtonComponent } from './info-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const components = [
  MatIconModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    InfoButtonComponent
  ],
  imports: [
    CommonModule,
    ...components
  ],
  exports: [
    InfoButtonComponent
  ]
})
export class InfoButtonModule { }
