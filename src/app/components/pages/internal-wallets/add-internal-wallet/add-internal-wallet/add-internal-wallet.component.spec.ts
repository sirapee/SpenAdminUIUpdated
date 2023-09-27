import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternalWalletComponent } from './add-internal-wallet.component';

describe('AddInternalWalletComponent', () => {
  let component: AddInternalWalletComponent;
  let fixture: ComponentFixture<AddInternalWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInternalWalletComponent]
    });
    fixture = TestBed.createComponent(AddInternalWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
