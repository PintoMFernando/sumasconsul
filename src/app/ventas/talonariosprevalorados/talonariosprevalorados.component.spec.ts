import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonariosprevaloradosComponent } from './talonariosprevalorados.component';

describe('TalonariosprevaloradosComponent', () => {
  let component: TalonariosprevaloradosComponent;
  let fixture: ComponentFixture<TalonariosprevaloradosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalonariosprevaloradosComponent]
    });
    fixture = TestBed.createComponent(TalonariosprevaloradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
