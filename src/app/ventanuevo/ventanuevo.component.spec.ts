import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanuevoComponent } from './ventanuevo.component';

describe('VentanuevoComponent', () => {
  let component: VentanuevoComponent;
  let fixture: ComponentFixture<VentanuevoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanuevoComponent]
    });
    fixture = TestBed.createComponent(VentanuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
