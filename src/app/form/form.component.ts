import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../form-data';
import { FormService } from '../form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form_data: Data;
  view_data: Data;
  form: FormGroup;
  subSuccess: Boolean = false;

  constructor(private fb: FormBuilder, private fs: FormService, private snackBar: MatSnackBar) { // injecting the service
    this.view_data = { name: '', email: '', feedback: '', comment: '' };
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      feedback: ['', [Validators.required]],
      comment: ['', []]
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 60000, // 1 min timeout
    });
  }

  onSubmit() {
    // returns an Observable, asynchronously if the form is valid
    if (this.form.valid) {
      this.fs.sendData({
        name: this.form.value.name,
        email: this.form.value.email,
        feedback: this.form.value.feedback,
        comment: this.form.value.comment
      }).subscribe(
        data => {
          if (data) {
            this.view_data = data; // population of view_data
            this.subSuccess = true;
            this.openSnackBar("Submission successful", "Done");
          } else {
            this.subSuccess = true;
            this.openSnackBar("Submission successful but data not returned", "Try again");
          }
        },
        error => {
          console.log(error);
          this.subSuccess = false;
          this.openSnackBar("Submission failed due to the following error(s): " + error, "Try again");
        }
      );
    }
  }

}
