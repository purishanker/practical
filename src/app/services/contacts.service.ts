import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";

export class TODO {
  $key: string;
  name: string;
  email: string;
  mobile: number;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private ngFire: AngularFirestore,
    private router: Router
  ) { }

  create(todo: TODO) {
    return this.ngFire.collection('contacts').add(todo);
  }

  getContacts() {
    return this.ngFire.collection('contacts').snapshotChanges();
  }
  
  getContact(id) {
    return this.ngFire.collection('contacts').doc(id).valueChanges();
  }

  update(id, todo: TODO) {
    this.ngFire.collection('contacts').doc(id).update(todo)
      .then(() => {
        this.router.navigate(['/list']);
      }).catch(error => console.log(error));;
  }

  delete(id: string) {
    this.ngFire.doc('contacts/' + id).delete();
  }

}
