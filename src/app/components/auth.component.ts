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
  @ViewChild('regForm', { static: false })
  regform!: ElementRef

  registrationForm!: FormGroup;
  regInfo = {
    login: '',
    email: '',
    password: '',
    confirmPassword:''
  };


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
    let form = new FormData(this.regform.nativeElement)
    this.accountserv.register(form).subscribe({
      next: (jwttoken: object) => {

      },
      error: (regerror: Error) => {

      }
    })


  }

}
