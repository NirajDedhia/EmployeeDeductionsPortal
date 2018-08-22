import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatFormFieldModule,  MatInputModule, MatButtonModule, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { EmployeeServiceService } from '../../services/employee/employee-service.service';
import { EmployeemodalComponent } from '../employeemodal/employeemodal.component';
import { DataSource } from '@angular/cdk/table';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: String;
  employees: any[];
  isPopupOpened = true;
  public displayedColumns = ['name', 'salary', 'address', 'phone', 'delete'];
  dataSource = new MatTableDataSource(this.employees);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private employeeService: EmployeeServiceService, private router: Router) {
    this.title = "Home Component";
   }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((emps) => {
      this.employees = emps;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  goToEmployee(eid) {
    this.router.navigate(['employee/'+eid]);
  }

  deleteEmployee(eid) {
    var conf = confirm("Are you sure you want to delete an employee");
    if(!conf)
      return false;

    this.employeeService.deleteEmployee(eid).subscribe((res) => {
      if(res.deletedCount == 1)
        this.ngOnInit();
      else
        // Error Popup
        console.log("Error while deleting");
    });
  }

  create() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(EmployeemodalComponent, {
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

}
