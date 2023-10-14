import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasnetasComponent } from './comprasnetas.component';

describe('ComprasnetasComponent', () => {
  let component: ComprasnetasComponent;
  let fixture: ComponentFixture<ComprasnetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprasnetasComponent]
    });
    fixture = TestBed.createComponent(ComprasnetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
