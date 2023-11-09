import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepuntoventaactividadComponent } from './updatepuntoventaactividad.component';

describe('UpdatepuntoventaactividadComponent', () => {
  let component: UpdatepuntoventaactividadComponent;
  let fixture: ComponentFixture<UpdatepuntoventaactividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatepuntoventaactividadComponent]
    });
    fixture = TestBed.createComponent(UpdatepuntoventaactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
