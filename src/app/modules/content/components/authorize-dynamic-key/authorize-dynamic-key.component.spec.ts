import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeDynamicKeyComponent } from './authorize-dynamic-key.component';

describe('AuthorizeDynamicKeyComponent', () => {
  let component: AuthorizeDynamicKeyComponent;
  let fixture: ComponentFixture<AuthorizeDynamicKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizeDynamicKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeDynamicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
