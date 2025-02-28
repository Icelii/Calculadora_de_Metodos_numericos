import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EulerMejoradoComponent } from './euler-mejorado.component';

describe('EulerMejoradoComponent', () => {
  let component: EulerMejoradoComponent;
  let fixture: ComponentFixture<EulerMejoradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EulerMejoradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EulerMejoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
