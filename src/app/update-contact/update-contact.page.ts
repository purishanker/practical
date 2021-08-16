import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss'],
})
export class UpdateContactPage implements OnInit {

  editForm: FormGroup;
  id: any;
  isSubmitted: boolean = false;
  constructor(
    private contactService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.contactService.getContact(this.id).subscribe((data) => {
      this.editForm = this.formBuilder.group({
        name :[data['name']],
        email :[data['email']],
        mobile :[data['mobile']],
        notes :[data['notes']],
      })
    });
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      email : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],        
      notes: ['',[Validators.required]],
    })
  }

  get errorControl() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
    this.contactService.update(this.id, this.editForm.value);
    this.router.navigate(['/list']);
  }
  }
}
