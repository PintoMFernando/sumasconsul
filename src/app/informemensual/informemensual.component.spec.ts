import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformemensualComponent } from './informemensual.component';

describe('InformemensualComponent', () => {
  let component: InformemensualComponent;
  let fixture: ComponentFixture<InformemensualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformemensualComponent]
    });
    fixture = TestBed.createComponent(InformemensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
