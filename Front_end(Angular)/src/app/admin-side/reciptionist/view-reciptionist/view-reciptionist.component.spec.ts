import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReciptionistComponent } from './view-reciptionist.component';

describe('ViewReciptionistComponent', () => {
  let component: ViewReciptionistComponent;
  let fixture: ComponentFixture<ViewReciptionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewReciptionistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewReciptionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
