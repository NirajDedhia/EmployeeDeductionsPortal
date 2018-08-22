import { Component, OnInit, Inject, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { EmployeeServiceService } from '../../services/employee/employee-service.service';
import { PlanServiceService } from '../../services/plan/plan-service.service';
import { EmplanmapServiceService } from '../../services/emplanmap/emplanmap-service.service';
import { Plan } from '../../models/plan';
import { DataSource } from '@angular/cdk/table';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-employeemodal',
  templateUrl: './employeemodal.component.html',
  styleUrls: ['./employeemodal.component.css']
})
export class EmployeemodalComponent implements OnInit {

  public _employeeForm: FormGroup;
  plans: any;
  currentPlan={amount:0.0};

  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EmployeemodalComponent>,
    private employeeService: EmployeeServiceService,
    private planService: PlanServiceService,
    private emplanmapService: EmplanmapServiceService,
    private changeDetRef: ChangeDetectorRef,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._employeeForm = this._formBuilder.group({
      id: [this.data.id],
      name: [ this.data.name, [Validators.required]],
      address: [ this.data.address, []],
      phone: [ this.data.phone, [Validators.required]],
      salary: [ this.data.salary , [Validators.required]],
      plan: [ this.data.plans , [Validators.required]],
    });
    
    this.getPlans();
    if(!this.data.plans){
      this.data.plans = [];
    }
  }

  getPlans() {
    this.planService.getAllPlans().subscribe((plans) => {
      this.plans = plans;
    }); 
  }

  setCurrentPlan(plan) {
    this.currentPlan = plan;
  }

  onSubmit() {
    if (!this.data._id) {
      
      if(this.validateFields()) 
        this.createEmployee();
      else  
        this.dialogRef.close();
        // create Popup that data missing
    } else {
      
      if(this.validateFields())
        this.editEmployee();
      else  
        this.dialogRef.close();
    }
  }

  removePlanFromList(plan) {
    this.data.plans = this.data.plans.filter(p=>{
      return p.pid != plan.pid;
    });
  }

  validateFields() {
    if (this._employeeForm.controls.name.value && this._employeeForm.controls.name.value.trim()!="" &&
        this._employeeForm.controls.salary.value && this._employeeForm.controls.phone.value 
        )
        return true;
    else
        return false;
  }

  // Adding a plan to current list
  addPlan(f: NgForm) {
    let p = this.currentPlan;
    p['percentage'] = f.value.ppercentage;
    this.data.plans.push(p);
  }

  // Creating a new employee
  createEmployee() {
    const tempPlans = [];
    this.data.plans.forEach(plan => {
      tempPlans.push(this.format(plan));
    });
    const empObject = new Employee();

    empObject.name = this._employeeForm.controls.name.value,
    empObject.address = this._employeeForm.controls.address.value,
    empObject.salary = this._employeeForm.controls.salary.value,
    empObject.phone = this._employeeForm.controls.phone.value
    
    this.employeeService.createEmployee( empObject ).subscribe((emp) => {
      this.emplanmapService.addEmplPlanMap(emp._id, tempPlans)
              .subscribe((res) => {
                this.dialogRef.close();
                this.router.navigate(['employee/'+emp._id]);
              })
    }); 
  }

  // Creating a new employee
  editEmployee() {
    const tempPlans = [];
    this.data.plans.forEach(plan => {
      tempPlans.push(this.format(plan));
    });
    const empObject = new Employee();

    empObject.id = this.data._id;
    empObject.name = this._employeeForm.controls.name.value,
    empObject.address = this._employeeForm.controls.address.value,
    empObject.salary = this._employeeForm.controls.salary.value,
    empObject.phone = this._employeeForm.controls.phone.value
    console.log(this.data.plans);
    this.employeeService.editEmployee( empObject ).subscribe((emp) => {
      this.emplanmapService.editEmplPlanMap(empObject.id, tempPlans)
              .subscribe((res) => {
                this.dialogRef.close();
                // window.location.reload(true);
                this.router.navigate(['']);
              })
    }); 
  }

  // Creating plan object and adding id and pecentage if any
  format(plan) {
    const p = {};
    if(plan._id)
      p['pid'] = plan._id;
    else
    p['pid'] = plan.pid;
    if(plan.percentage)
      p['percentage'] = plan.percentage;
    return p;
  }

}
