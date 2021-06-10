import { UserService } from './../service/user/user.service';
import { User } from './../model';
import { Router } from '@angular/router';

import { LoginService } from './../service/login/login.service';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authentication } from '../model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required])
});

authentication: Authentication;

  constructor(public loginSevice: LoginService, private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right, #12c, #12c2, #12c)'
  }

  ngOnDestroy(): void{
    document.querySelector('html').style.background = 'none'
  }

login(){
  this.authentication = this.loginForm.value;
  if(this.loginForm.valid){
    this.loginSevice.authenticate(this.authentication).subscribe(
      data => {
        //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split
        //console.log(atob(data));
        //recebe o token e admin do backend (token:admin) usando a função split para desmenbrar o return. 
        //usando a função atob para decodficar o recebido do backend
        const tokenData = atob(data.split(':')[0])
        const username = tokenData.split(':')[0]
        const password = tokenData.split(':')[1]
        const admin = data.split(':')[1]
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('admin', admin);
        localStorage.setItem('token', data);
        this.router.navigate(['/contact_list'])
        
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
