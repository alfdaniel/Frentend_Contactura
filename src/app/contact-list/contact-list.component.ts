import { Router } from '@angular/router';
import { ContactService } from './../service/contact/contact.service';
import { Contact } from './../model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[] = [];
  constructor(private contactService: ContactService, private router: Router) {
   }


  ngOnInit(): void {
    this.getContacts();
  }

  ngOnDestroy(): void{
    
  }

  getContacts(){
    this.contactService.getContacts().subscribe(
      data => {
        this.contactList = data;
      },
      error => {
        Swal.fire({
          title: 'Ooops!',
          text: 'Erro ao retornar lista',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }

  deleteContact(id: number){
    this.contactService.deleteContacts(id).subscribe(
      data => {
        Swal.fire({
          title: 'Legal!',
          text: 'Contato deletado com sucesso',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/contact_list']));
        //this.router.navigate(['/contact_list']);
      }
    );
  };

goToCreate(){
  this.router.navigate(['/contact']);
}

editContact(contact: Contact){
  this.contactService.getContactForList(contact);
  this.router.navigate(['/contact']);
}

}
