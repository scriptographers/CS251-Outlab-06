import { Component, OnInit } from '@angular/core';
import { Data } from '../form-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form_data: Data;
  view_data: Data;

  constructor() {
    this.form_data = {name: 'a', email:'a', feedback: 'a', comments: 'a'};
    this.view_data = {name: 'a', email:'a', feedback: 'a', comments: 'a'};
  }

  ngOnInit() {
  }

}
