import { Component, OnInit } from '@angular/core';

import { ContactsService } from '../services/contacts.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  contactForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private contactService: ContactsService,
    public formBuilder: FormBuilder,    
    private router: Router
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      email : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],        
      notes: ['',[Validators.required, Validators.minLength(20)]],
    })
  }

  get errorControl() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.contactForm.valid) {
      return false;
    } else {
      this.contactService.create(this.contactForm.value)
      .then(() => {
        this.contactForm.reset();
        this.router.navigate(['/list']);
      }).catch((err) => {
        console.log(err)
      });
    }
  }
}
