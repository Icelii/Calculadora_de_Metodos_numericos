import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RungeKuttaComponent } from './runge-kutta.component';

describe('RungeKuttaComponent', () => {
  let component: RungeKuttaComponent;
  let fixture: ComponentFixture<RungeKuttaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RungeKuttaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RungeKuttaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
