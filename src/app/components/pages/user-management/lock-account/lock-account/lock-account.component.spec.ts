import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockAccountComponent } from './lock-account.component';

describe('LockAccountComponent', () => {
  let component: LockAccountComponent;
  let fixture: ComponentFixture<LockAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockAccountComponent]
    });
    fixture = TestBed.createComponent(LockAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
