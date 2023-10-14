import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcrearmesContentComponent } from './modalcrearmes-content.component';

describe('ModalcrearmesContentComponent', () => {
  let component: ModalcrearmesContentComponent;
  let fixture: ComponentFixture<ModalcrearmesContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalcrearmesContentComponent]
    });
    fixture = TestBed.createComponent(ModalcrearmesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
