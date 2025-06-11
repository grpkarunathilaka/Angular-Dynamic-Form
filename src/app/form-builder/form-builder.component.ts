import { Component, OnInit } from '@angular/core';
import { IFormStructure } from '../dynamic-form/form.interface';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  availableControls: IFormStructure[] = [
    { name: 'Text Input', type: 'text', label: 'Text Input', validations: [] },
    { name: 'Textarea', type: 'textarea', label: 'Textarea', validations: [] },
    { name: 'Checkbox', type: 'checkbox', label: 'Checkbox', validations: [] },
    { name: 'Number Input', type: 'number', label: 'Number Input', validations: [] },
    { name: 'Email Input', type: 'email', label: 'Email Input', validations: [] },
    { name: 'Password Input', type: 'password', label: 'Password Input', validations: [] },
    // Add more controls as needed
  ];

  formStructure: IFormStructure[] = [];
  private controlIdCounter = 0;

  constructor() { }

  ngOnInit(): void { }

  onDrop(event: CdkDragDrop<IFormStructure[]>) {
    if (event.previousContainer === event.container) {
      // Move item within the same list (canvas)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Copy item from toolbox to canvas
      const itemToCopy = event.previousContainer.data[event.previousIndex];
      const newItem: IFormStructure = JSON.parse(JSON.stringify(itemToCopy)); // Deep copy
      newItem.id = `${newItem.type}-${Date.now()}-${this.controlIdCounter++}`; // Unique ID

      copyArrayItem(
        event.previousContainer.data, // Source array (availableControls)
        event.container.data,        // Target array (formStructure)
        event.previousIndex,         // Source index
        event.currentIndex           // Target index
      );
      // Replace the copied item (which is a reference to original) with the deep copied and ID'd new item
      event.container.data[event.currentIndex] = newItem;
    }
  }

  saveForm(): void {
    const formJson = JSON.stringify(this.formStructure, null, 2);
    console.log('Form Structure JSON:');
    console.log(formJson);
    // Later, this could be expanded to download the JSON as a file
    // or send it to a backend service.
  }
}
