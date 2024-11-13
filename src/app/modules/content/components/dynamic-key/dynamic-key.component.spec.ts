import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicKeyComponent } from './dynamic-key.component';

describe('DynamicKeyComponent', () => {
  let component: DynamicKeyComponent;
  let fixture: ComponentFixture<DynamicKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
