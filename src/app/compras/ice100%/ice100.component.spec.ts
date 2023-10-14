import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ice100Component } from './ice100.component';

describe('Ice100Component', () => {
  let component: Ice100Component;
  let fixture: ComponentFixture<Ice100Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ice100Component]
    });
    fixture = TestBed.createComponent(Ice100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
