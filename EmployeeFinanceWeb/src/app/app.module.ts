import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule, MatTableModule,  MatSortModule, MatFormFieldModule,  MatInputModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';

import { EmployeeServiceService } from './services/employee/employee-service.service';
import { PlanServiceService } from './services/plan/plan-service.service';
import { EmplanmapServiceService } from './services/emplanmap/emplanmap-service.service';
import { EmployeemodalComponent } from './components/employeemodal/employeemodal.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employee/:id', component: EmployeeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    EmployeeComponent,
    EmployeemodalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeServiceService, PlanServiceService, EmplanmapServiceService],
  entryComponents: [EmployeemodalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
