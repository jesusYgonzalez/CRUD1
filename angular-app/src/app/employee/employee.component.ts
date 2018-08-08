import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee} from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor( public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.employeeService.getEmployeeList();
  }

  resetForm(form?: NgForm) {
    if(form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  onSubmit(form: NgForm) {
    if(form.value._id == "") {
      this.employeeService.postEmployee(form.value)
        .subscribe((res) => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          M.toast({html: 'Saved successfully', classes: 'rounded'});
        });
    } else {
      this.employeeService.putEmployee(form.value)
        .subscribe((res) => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          M.toast({html: 'Updated successfully', classes: 'rounded' });
        });
    }
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete?') ==  true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.employeeService.getEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}





