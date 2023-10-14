import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallecentralizadorContentComponent } from './modal-detallecentralizador-content.component';

describe('ModalDetallecentralizadorContentComponent', () => {
  let component: ModalDetallecentralizadorContentComponent;
  let fixture: ComponentFixture<ModalDetallecentralizadorContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetallecentralizadorContentComponent]
    });
    fixture = TestBed.createComponent(ModalDetallecentralizadorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
