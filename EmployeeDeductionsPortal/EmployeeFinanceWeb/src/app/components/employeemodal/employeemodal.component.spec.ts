import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemodalComponent } from './employeemodal.component';

describe('EmployeemodalComponent', () => {
  let component: EmployeemodalComponent;
  let fixture: ComponentFixture<EmployeemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
