import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ContactComponent } from './contact/contact.component';

// Specifies the route-component mapping
const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/contact', }, // default redirection to /contact
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
