import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReciptionistComponent } from './edit-reciptionist.component';

describe('EditReciptionistComponent', () => {
  let component: EditReciptionistComponent;
  let fixture: ComponentFixture<EditReciptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditReciptionistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditReciptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
