import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonarioselectronicosComponent } from './talonarioselectronicos.component';

describe('TalonarioselectronicosComponent', () => {
  let component: TalonarioselectronicosComponent;
  let fixture: ComponentFixture<TalonarioselectronicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalonarioselectronicosComponent]
    });
    fixture = TestBed.createComponent(TalonarioselectronicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
