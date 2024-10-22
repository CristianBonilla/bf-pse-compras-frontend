import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDynamicKeyComponent } from './confirm-dynamic-key.component';

describe('ConfirmDynamicKeyComponent', () => {
  let component: ConfirmDynamicKeyComponent;
  let fixture: ComponentFixture<ConfirmDynamicKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDynamicKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDynamicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
