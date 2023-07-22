import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
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

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  public form!: FormGroup;

  private _fb = inject(FormBuilder);
  private _unsubscribe = new Subject<void>();

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
    this._initForm(this.initValue);
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

  reset() {
    this.form.reset({
      search: '',
    });
  }

  focus() {
    this.searchInput.nativeElement.focus();
  }

  private _initForm(term = '') {
    this.form = this._fb.group({
      search: [term],
    });
  }
}
