import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObservacionesContentComponent } from './modal-observaciones-content.component';

describe('ModalObservacionesContentComponent', () => {
  let component: ModalObservacionesContentComponent;
  let fixture: ComponentFixture<ModalObservacionesContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalObservacionesContentComponent]
    });
    fixture = TestBed.createComponent(ModalObservacionesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
