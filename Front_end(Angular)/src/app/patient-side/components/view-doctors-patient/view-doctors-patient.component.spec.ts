import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorsPatientComponent } from './view-doctors-patient.component';

describe('ViewDoctorsPatientComponent', () => {
  let component: ViewDoctorsPatientComponent;
  let fixture: ComponentFixture<ViewDoctorsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDoctorsPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDoctorsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
