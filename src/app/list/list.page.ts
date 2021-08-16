import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

export class Contacts {
  $key: string;
  name: string;
  email: string;
  mobile: number;
  notes: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  List : Contacts[];

  constructor(private contactService: ContactsService, private router: Router) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe((res) => {
      this.List = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Contacts
        };
      })
    });
  }


  editContact(id){
    this.router.navigate(['/update-contact', id]);
  }

  remove(id) {
    console.log(id)
    if (window.confirm('Are you sure?')) {
      this.contactService.delete(id)
    }
  }  
}
