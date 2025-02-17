import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPatientComponent } from './default-patient.component';

describe('DefaultPatientComponent', () => {
  let component: DefaultPatientComponent;
  let fixture: ComponentFixture<DefaultPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
