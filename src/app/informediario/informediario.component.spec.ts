import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformediarioComponent } from './informediario.component';

describe('InformediarioComponent', () => {
  let component: InformediarioComponent;
  let fixture: ComponentFixture<InformediarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformediarioComponent]
    });
    fixture = TestBed.createComponent(InformediarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
