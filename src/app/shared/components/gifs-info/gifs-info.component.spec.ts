import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsInfoComponent } from './gifs-info.component';

describe('GifsInfoComponent', () => {
  let component: GifsInfoComponent;
  let fixture: ComponentFixture<GifsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
