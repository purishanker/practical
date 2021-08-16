import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { AlertController } from '@ionic/angular';
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

  constructor(private contactService: ContactsService, private router: Router, public alertController: AlertController) { }

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

  async remove(id) {
    const alert = await this.alertController.create({
      header: 'Delete Contact',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.contactService.delete(id)
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
