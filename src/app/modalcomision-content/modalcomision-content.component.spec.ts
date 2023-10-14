import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcomisionContentComponent } from './modalcomision-content.component';

describe('ModalcomisionContentComponent', () => {
  let component: ModalcomisionContentComponent;
  let fixture: ComponentFixture<ModalcomisionContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalcomisionContentComponent]
    });
    fixture = TestBed.createComponent(ModalcomisionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
