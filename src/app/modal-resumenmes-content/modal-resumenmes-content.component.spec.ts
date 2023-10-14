import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResumenmesContentComponent } from './modal-resumenmes-content.component';

describe('ModalResumenmesContentComponent', () => {
  let component: ModalResumenmesContentComponent;
  let fixture: ComponentFixture<ModalResumenmesContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalResumenmesContentComponent]
    });
    fixture = TestBed.createComponent(ModalResumenmesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
