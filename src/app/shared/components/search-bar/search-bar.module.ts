import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

const components = [MatInputModule, ReactiveFormsModule, MatIconModule];

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, ...components],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
