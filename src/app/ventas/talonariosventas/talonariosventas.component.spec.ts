import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonariosventasComponent } from './talonariosventas.component';

describe('TalonariosventasComponent', () => {
  let component: TalonariosventasComponent;
  let fixture: ComponentFixture<TalonariosventasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalonariosventasComponent]
    });
    fixture = TestBed.createComponent(TalonariosventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
