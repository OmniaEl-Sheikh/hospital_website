import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReciptionistComponent } from './add-reciptionist.component';

describe('AddReciptionistComponent', () => {
  let component: AddReciptionistComponent;
  let fixture: ComponentFixture<AddReciptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddReciptionistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddReciptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
