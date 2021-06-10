import { User } from './../model';
import { UserService } from './../service/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      data => {
       this.userList = data;
      },
      error => {
        Swal.fire({
          title: 'Ooops!',
          text: 'Erro ao retornar lista',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      });
  }

  deleteUser(id: number){
    this.userService.deleteUsers(id).subscribe(
      data => {
        Swal.fire({
          title: 'Legal!',
          text: 'Sucesso ao remover Usuário',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/user_list']));
        //this.router.navigate(['/user_list']);
      });
  }

  goToCreate(){
    this.router.navigate(['/user']);
  }

  editUser(user: User){
    this.userService.getUserForList(user);
    this.router.navigate(['/user']);
  }
    
}
