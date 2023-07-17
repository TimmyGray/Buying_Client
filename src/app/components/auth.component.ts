import { Component,OnInit, OnDestroy,AfterViewInit, ElementRef,ViewChild } from '@angular/core';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { AccountService } from '../services/account.service';
import { map, Observable, fromEvent, switchMap, mergeMap, exhaustMap, from, of, filter } from 'rxjs';
import { Form, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { confirmPasswordValidator } from '../directives/confirm_password_validator.directive';

@Component({
  selector:'app-auth',
  templateUrl: './htmls/auth.component.html',
  providers: [AccountService]
})
export class AuthorizeComponent implements OnInit, OnDestroy {
  //@ViewChild('regForm', { static: false })
  //regform!: ElementRef

  registrationForm!: FormGroup;
  regInfo = {
    login: '',
    email: '',
    password: '',
    confirmPassword:''
  };

  hide: boolean = true;

  constructor(private readonly accountserv: AccountService) { }

  ngOnDestroy(): void { }

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      login: new FormControl(this.regInfo.login, [Validators.required, Validators.maxLength(20)]),
      email: new FormControl(this.regInfo.email, [Validators.required, Validators.email]),
      password: new FormControl(this.regInfo.password, [Validators.required, Validators.minLength(10)]),
      confirmPassword: new FormControl(this.regInfo.confirmPassword, [Validators.required])
    }, { validators: confirmPasswordValidator });

  }

  get login() { return this.registrationForm.get('login'); }

  get email() { return this.registrationForm.get('email'); }

  get password() { return this.registrationForm.get('password'); }

  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  registerClient() {

    of(this.regInfo).pipe(
      map(regform => {
        regform.login = this.registrationForm.get('login')?.value;
        regform.email = this.registrationForm.get('email')?.value;
        regform.password = this.registrationForm.get('password')?.value;
        regform.confirmPassword = this.registrationForm.get('confirmPassword')?.value;
      }),
      exhaustMap(() => this.accountserv.register(this.regInfo))
    ).subscribe({
      next: (jwttoken: any) => {

        this.setJwt(jwttoken);
        console.log('Successful registration');
        alert('Successful registration! Please, login to make an order!')

      },
      error: (regerror: Error) => {

        alert(regerror.message);
        console.log(regerror);

      }
    })


  }

  private setJwt(jwt_token:any) {


    try {

      sessionStorage.setItem('access_token', jwt_token.access_token);
      sessionStorage.setItem('login', jwt_token.login);
      sessionStorage.setItem('email', jwt_token.email);

    }
    catch {

      console.log('Something wrong with token');

    }
    finally {

      console.log(jwt_token);

    }
    
  }

}
