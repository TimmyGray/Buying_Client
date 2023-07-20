import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Client } from '../models/client';
import { AccountService } from '../services/account.service';
import { ClientsIndentityService } from '../services/clients_indentity.service';
import { map, Observable, fromEvent, switchMap, mergeMap, exhaustMap, from, of, filter } from 'rxjs';
import { Form, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { confirmPasswordValidator } from '../directives/confirm_password_validator.directive';

@Component({
  selector:'app-auth',
  templateUrl: './htmls/auth.component.html',
  providers: [AccountService]
})
export class AuthorizeComponent implements OnInit, OnDestroy {

  registrationForm!: FormGroup;
  loginForm!: FormGroup;

  regInfo = {
    login: '',
    email: '',
    password: '',
    confirmPassword:''
  };

  logInfo = {
    emailOrLogin: '',
    password:''
  }

  isRegistration: boolean;
  hide: boolean = true;

  constructor(
    private readonly accountserv: AccountService,
    private readonly clientsserv: ClientsIndentityService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
    this.isRegistration = (this.route.snapshot.params['isreg'] === 'true')?true:false;
    
  }

  ngOnDestroy(): void { }

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      login: new FormControl(this.regInfo.login, [Validators.required, Validators.maxLength(20)]),
      email: new FormControl(this.regInfo.email, [Validators.required, Validators.email]),
      password: new FormControl(this.regInfo.password, [Validators.required, Validators.minLength(10)]),
      confirmPassword: new FormControl(this.regInfo.confirmPassword, [Validators.required])
    }, { validators: confirmPasswordValidator });

    this.loginForm = new FormGroup({
      emailOrLogin: new FormControl(this.logInfo.emailOrLogin, [Validators.required]),
      password: new FormControl(this.logInfo.password, [Validators.required])
    })

    this.route.paramMap.pipe(

      switchMap((params: ParamMap) => params.getAll('isreg')),
      map((param: string) => (param === 'true') ? true : false)

    ).subscribe({
      next: (isreg: boolean) => this.isRegistration = isreg
    });

  }

  get registrationInfo() {
    return {
      login: this.registrationForm.get('login'),
      email: this.registrationForm.get('email'),
      password: this.registrationForm.get('password'),
      confirmPassword: this.registrationForm.get('confirmPassword')
    }
  }

  get loginInfo() {
    return {
      emailOrLogin: this.loginForm.get('emailOrLogin'),
      password: this.loginForm.get('password')
    }

  }

  registerClient() {

    of(this.regInfo).pipe(
      map(regform => {
        regform.login = this.registrationInfo.login?.value;
        regform.email = this.registrationInfo.email?.value;
        regform.password = this.registrationInfo.password?.value;
        regform.confirmPassword = this.registrationInfo.confirmPassword?.value;
      }),
      exhaustMap(() => this.accountserv.register(this.regInfo))
    ).subscribe({
      next: (jwttoken: any) => {

        this.clientsserv.login(jwttoken);
        console.log('Successful registration');
        alert('Successful registration! Please, login to make an order!')

      },
      error: (regerror: any) => {

        alert(regerror.error);
        console.log(regerror);

      }
    });


  }

  loginClient() {

    of(this.logInfo).pipe(
      map(logform => {
        logform.emailOrLogin = this.loginInfo.emailOrLogin?.value;
        logform.password = this.loginInfo.password?.value;
      }),
      exhaustMap(() => this.accountserv.login(this.logInfo))
    ).subscribe({
      next: (jwttoken: any) => {

        this.clientsserv.login(jwttoken);
        console.log('Successful login');
        this.router.navigate(['']);

      },
      error: (logerror: any) => {

        alert(logerror.error);
        console.log(logerror);

      }
    });

  }


}
