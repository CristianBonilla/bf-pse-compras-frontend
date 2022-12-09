import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrordetailComponent } from './errordetail.component';

describe('ErrordetailComponent', () => {
  let component: ErrordetailComponent;
  let fixture: ComponentFixture<ErrordetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrordetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
