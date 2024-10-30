import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormStructure } from './form.interface';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
    
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {

  dynamicForm!: FormGroup;
  formStructure!: IFormStructure[];
  
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit() {
    this.http.get<IFormStructure[]>('assets/form-structure.json').subscribe(data => {
      this.formStructure = data;
      this.createForm();
    });    
  }

  createForm() {
    this.formStructure.forEach(control => {
       const validators = control.validations?.map(v => Validators[v.validator as keyof Validators]) || [];
      let formControl;
      formControl = this.fb.control(control.value || '', validators);
      this.dynamicForm.addControl(control.name, formControl);

    });
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  } 
  
}
