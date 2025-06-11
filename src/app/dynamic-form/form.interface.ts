export interface IFormStructure {
    id?: string;
    type: string;
    label: string;
    name: string;
    value?: string | number | boolean;
    options?: { label: string; value: string | number }[];
    validations?: { name: string; validator: string; message: string }[];
  }