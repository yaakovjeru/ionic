import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup, ValidationErrors } from "@angular/forms";
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss']
})
export class Form1Component {

  public userForm:any;
  errorMessage:any = [];
  formData:any = [];
  allSelected=false;
  firstFormGroup: FormGroup = this.formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this.formBuilder.group({secondCtrl: ['']});
  toppings = new FormControl('');
  areaList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  @ViewChild('select') select: MatSelect;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.formData.allSelected = false;
    this.formData.allSelected2 = false;
    this.userForm = new FormGroup(
      {
        'name': new FormControl(null, Validators.required),
        'email': new FormControl(
          null,
          [Validators.required, Validators.email]
        ),
        'hobbies': new FormArray([])
      }
    );
  }

  get controls() {
    return (this.userForm.get('hobbies') as FormArray).controls;
  }

  addHobby() {
    (this.userForm.get('hobbies') as FormArray)
      .push(
        new FormGroup({
          'name': new FormControl(null, Validators.required)
        })
      );
  }

  onSubmit() {
    this.getAllErrors(this.userForm)    

    if(!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }else{
      console.log(this.userForm.value);
    }
  }

  getAllErrors(form: any){
    this.errorMessage = [];
    Object.keys(form.controls).forEach(key => {
      let controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          this.errorMessage.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });
    console.log(this.errorMessage);
  }

  selectAll(select: any) {
    // let values: any[] = [];
  
    // for(let group of this.groups){
    //   for(let item of group.items){
    //     values.push(item.value);
    //   }
    // }
  
    // select.update.emit(values);
    console.log('11');
  }

  toggleAllSelection(group:any, label:any) {
    if (group.checked === true) {
      this.select.options.forEach((item: MatOption) => {
        if(item.group.label == label){
          item.select();
        }
      });
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

   optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
  
}
