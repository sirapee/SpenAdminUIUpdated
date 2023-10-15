import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransDebitComponent } from './trans-debit.component';

describe('TransDebitComponent', () => {
  let component: TransDebitComponent;
  let fixture: ComponentFixture<TransDebitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransDebitComponent]
    });
    fixture = TestBed.createComponent(TransDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
