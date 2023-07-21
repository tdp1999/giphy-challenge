import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() initValue = '';
  @Input() placeholder = 'Find Anything...';

  @Output() search = new EventEmitter<string>();

  private _fb = inject(FormBuilder);
  private _unsubscribe = new Subject<void>();

  public form!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !changes['initValue'] ||
      changes['initValue'].currentValue === changes['initValue'].previousValue
    )
      return;
    if (!this.form) return;
    this.form.patchValue({ search: changes['initValue'].currentValue });
  }

  ngOnInit(): void {
    this.initForm(this.initValue);
    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        takeUntil(this._unsubscribe)
      )
      .subscribe(({ search }) => this.search.emit(search));
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  initForm(term = '') {
    this.form = this._fb.group({
      search: [term],
    });
  }

  reset() {
    this.form.reset({
      search: '',
    });
  }
}
