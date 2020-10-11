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

  constructor(private fb: FormBuilder, private fs: FormService) { // injecting the service
    this.view_data = { name: '', email: '', feedback: '', comment: '' };
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      email: ['', Validators.email],
      feedback: [''],
      comment: ['']
    });

    this.fs.getInit()
      .subscribe(data => {
        this.form_data = data;
        if (this.form_data) {
          this.form.setValue(this.form_data);
          this.view_data = this.form_data;
        }
      });
  }

  onSubmit() {
    // returns an Observable, asynchronously
    this.fs.sendData({
      name: this.form.value.name,
      email: this.form.value.email,
      feedback: this.form.value.feedback,
      comment: this.form.value.comment
    }).subscribe(data => {
      this.view_data = data; // population of view_data
    });
  }

}
