import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasalidaComponent } from './entradasalida.component';

describe('EntradasalidaComponent', () => {
  let component: EntradasalidaComponent;
  let fixture: ComponentFixture<EntradasalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradasalidaComponent]
    });
    fixture = TestBed.createComponent(EntradasalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
