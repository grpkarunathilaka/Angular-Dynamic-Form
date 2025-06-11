import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import this
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormBuilderComponent } from '../form-builder/form-builder.component';


@NgModule({
  declarations: [FormBuilderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  exports: [FormBuilderComponent]
})
export class DynamicFormModule { }
