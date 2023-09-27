import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalWalletsComponent } from './internal-wallets.component';

describe('InternalWalletsComponent', () => {
  let component: InternalWalletsComponent;
  let fixture: ComponentFixture<InternalWalletsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalWalletsComponent]
    });
    fixture = TestBed.createComponent(InternalWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
