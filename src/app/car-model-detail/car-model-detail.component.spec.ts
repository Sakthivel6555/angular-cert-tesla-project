import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelDetailComponent } from './car-model-detail.component';

describe('CarModelDetailComponent', () => {
  let component: CarModelDetailComponent;
  let fixture: ComponentFixture<CarModelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModelDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarModelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
