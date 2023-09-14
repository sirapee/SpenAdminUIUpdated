import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMerchantComponent } from './update-merchant.component';

describe('UpdateMerchantComponent', () => {
  let component: UpdateMerchantComponent;
  let fixture: ComponentFixture<UpdateMerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMerchantComponent]
    });
    fixture = TestBed.createComponent(UpdateMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
