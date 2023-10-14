import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIUEContentComponent } from './modal-iue-content.component';

describe('ModalIUEContentComponent', () => {
  let component: ModalIUEContentComponent;
  let fixture: ComponentFixture<ModalIUEContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalIUEContentComponent]
    });
    fixture = TestBed.createComponent(ModalIUEContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
