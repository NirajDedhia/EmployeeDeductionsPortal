import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog, MatCardModule, MatExpansionModule } from '@angular/material';

import { EmployeeServiceService } from '../../services/employee/employee-service.service';
import { PlanServiceService } from '../../services/plan/plan-service.service';
import { EmplanmapServiceService } from '../../services/emplanmap/emplanmap-service.service';
import { EmployeemodalComponent } from '../employeemodal/employeemodal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  title: String;
  employee: any;
  plans: any;
  ePlans: any;
  expand: boolean;

  isPopupOpened = true;

  constructor(private dialog: MatDialog, private route:ActivatedRoute, private router: Router, private employeeService: EmployeeServiceService, private planService: PlanServiceService, private emplanmapService: EmplanmapServiceService) {
    this.title = "Employee Component";
    this.expand = false;
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(!params['id'])
        this.router.navigate(['home']);
      else{
        this.getEmployeeDetail(params['id']);
      }
    });
  }

  goToHome() {
    this.router.navigate(['']);
  }

  getEmployeeDetail(eid) {
    this.employeeService.getEmployee(eid).subscribe((emp) => {
      this.employee = emp;
      this.getPlans();
    });
  }

  getPlans() {
    this.planService.getAllPlans().subscribe((plans) => {
      this.plans = plans;
      const arrayToObject = (array) =>
      array.reduce((obj, item) => {
        obj[item._id] = item
        return obj
      }, {});
      this.plans = arrayToObject(this.plans);
      this.getEmployeePlans();
    }); 
  }

  getEmployeePlans() {
    this.emplanmapService.getEmployeesPlans(this.employee._id).subscribe((plans) => {
      this.ePlans = plans[0].plans;
      this.pushPlansInEmployee();
    }); 
  }

  pushPlansInEmployee() {
    let employeePlans = [];
    let amount = 0;

    this.ePlans.forEach(p => {
      let empPlan = {};
      let eplan = this.plans[p.pid];
      empPlan['pid'] = eplan._id;
      empPlan['name'] = eplan.name;
      if(p.percentage) { // Custom Plans
        empPlan['amount'] = this.employee.salary * p.percentage / 100;
        empPlan['percentage'] = p.percentage;
      }
      else { // Fixed amount plans
        empPlan['amount'] = eplan.amount;
      }
      employeePlans.push(empPlan);
      amount += empPlan['amount'];
    });

    this.employee['plans'] = employeePlans;
    this.employee['deduction'] = amount;
    this.employee['netPay'] = this.employee.salary - amount;
  }

  toggleExCol() {
    this.expand = !this.expand;
  }

  modify() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(EmployeemodalComponent, {
      data: this.employee
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

}
