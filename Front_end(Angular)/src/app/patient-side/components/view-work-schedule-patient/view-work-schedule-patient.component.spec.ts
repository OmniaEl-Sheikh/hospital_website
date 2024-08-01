import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkSchedulePatientComponent } from './view-work-schedule-patient.component';

describe('ViewWorkSchedulePatientComponent', () => {
  let component: ViewWorkSchedulePatientComponent;
  let fixture: ComponentFixture<ViewWorkSchedulePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewWorkSchedulePatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWorkSchedulePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
