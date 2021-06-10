import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../model';
import { Router } from '@angular/router';
import { UserService } from './../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {
  user: User = null;
  
  userForm = new FormGroup({
    id: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    admin: new FormControl('', [Validators.required])
  });

  constructor(public userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.userService.botaoEdit.subscribe( edit => {
      this.user = edit;
      this.userForm.get('id').setValue(edit.id);
      this.userForm.get('name').setValue(edit.name);
      this.userForm.get('username').setValue(edit.username);
      this.userForm.get('admin').setValue(edit.admin);
    });
  }

  createUsers(){
    if (this.userForm.valid){
      this.user = this.userForm.value;
      this.userService.createUsers(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Legal!',
            text: 'Usuário criado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/login']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao criar usuário',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }else{
      Swal.fire({
        title: 'Ooops!',
        text: 'Preencha todos os campos',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }

  updateUsers(){
    if (this.userForm.valid){
      this.user = this.userForm.value;
      this.userService.updateUsers(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Legal!',
            text: 'Usuário editado com sucesso',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/user_list']);
        },
        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao editar usuário',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    }else{
      Swal.fire({
        title: 'Ooops!',
        text: 'Preencha todos os campos',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }




}
