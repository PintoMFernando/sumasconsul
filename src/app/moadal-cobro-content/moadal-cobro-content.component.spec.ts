import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoadalCobroContentComponent } from './moadal-cobro-content.component';

describe('MoadalCobroContentComponent', () => {
  let component: MoadalCobroContentComponent;
  let fixture: ComponentFixture<MoadalCobroContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoadalCobroContentComponent]
    });
    fixture = TestBed.createComponent(MoadalCobroContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
