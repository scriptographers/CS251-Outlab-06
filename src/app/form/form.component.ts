import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../form-data';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form_data: Data;
  view_data: Data;
  form: FormGroup;

  constructor(private fb: FormBuilder, private fs: FormService) {
    this.form_data = { name: 'a', email: 'a', feedback: 'a', comments: 'a' };
    this.view_data = { name: 'a', email: 'a', feedback: 'a', comments: 'a' };
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['a'],
      email: ['a', Validators.email],
      feedback: ['Okay'],
      comments: ['a']
    });
  }

  onSubmit() {
    console.log('Valid?', this.form.valid); // true or false
    console.log('Name', this.form.value.name);
    console.log('Email', this.form.value.email);
    console.log('Feedback', this.form.value.feedback);
    console.log('Comments', this.form.value.comments);
  }

}
