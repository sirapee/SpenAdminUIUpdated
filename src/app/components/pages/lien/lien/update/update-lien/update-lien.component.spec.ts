import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLienComponent } from './update-lien.component';

describe('UpdateLienComponent', () => {
  let component: UpdateLienComponent;
  let fixture: ComponentFixture<UpdateLienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLienComponent]
    });
    fixture = TestBed.createComponent(UpdateLienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
