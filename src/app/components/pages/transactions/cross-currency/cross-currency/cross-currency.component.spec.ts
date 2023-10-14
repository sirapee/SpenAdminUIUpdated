import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossCurrencyComponent } from './cross-currency.component';

describe('CrossCurrencyComponent', () => {
  let component: CrossCurrencyComponent;
  let fixture: ComponentFixture<CrossCurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrossCurrencyComponent]
    });
    fixture = TestBed.createComponent(CrossCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
