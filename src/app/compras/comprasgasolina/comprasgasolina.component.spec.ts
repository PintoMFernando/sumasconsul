import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasgasolinaComponent } from './comprasgasolina.component';

describe('ComprasgasolinaComponent', () => {
  let component: ComprasgasolinaComponent;
  let fixture: ComponentFixture<ComprasgasolinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprasgasolinaComponent]
    });
    fixture = TestBed.createComponent(ComprasgasolinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
