import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIVAContentComponent } from './modal-iva-content.component';

describe('ModalIVAContentComponent', () => {
  let component: ModalIVAContentComponent;
  let fixture: ComponentFixture<ModalIVAContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalIVAContentComponent]
    });
    fixture = TestBed.createComponent(ModalIVAContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
