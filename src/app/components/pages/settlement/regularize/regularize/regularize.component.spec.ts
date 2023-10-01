import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizeComponent } from './regularize.component';

describe('RegularizeComponent', () => {
  let component: RegularizeComponent;
  let fixture: ComponentFixture<RegularizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegularizeComponent]
    });
    fixture = TestBed.createComponent(RegularizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
