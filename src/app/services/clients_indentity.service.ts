import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsIndentityService {
  private isAuthorized: Subject<boolean> = new Subject<boolean>();
  public isAuthorized$: Observable<boolean> = this.isAuthorized.asObservable();

  constructor() {
    let token = sessionStorage.getItem('access_token');
    (token) ? (this.getExpirationTime(token) < 0 ? this.removeJwt() : undefined) : undefined;
    this.isAuthorized.next(this.checkAuthorize());
  }

  public checkAuthorize(): boolean {
    var check = (sessionStorage.getItem('access_token') != null
      && sessionStorage.getItem('email') != null
      && sessionStorage.getItem('login') != null) ? true : false;

    return check;

  }

  public login(jwt_token: any) {
    this.setJwt(jwt_token);
    this.isAuthorized.next(true);
  }

  public logout() {

    this.removeJwt();
    this.isAuthorized.next(false);

  }

  private setJwt(jwt_token: any) {


    try {

      sessionStorage.setItem('access_token', jwt_token.access_token);
      sessionStorage.setItem('login', jwt_token.login);
      sessionStorage.setItem('email', jwt_token.email);
      setTimeout(() => { this.logout(); console.log('token expired!'); }, this.getExpirationTime(jwt_token.access_token));
    }
    catch {

      console.log('Something wrong with token');

    }
    finally {

      console.log(jwt_token);

    }

  }

  removeJwt() {

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('email');

  }

  getExpirationTime(token:string) {

    let exptime = JSON.parse(atob(token.split('.')[1]));
    return exptime.exp * 1000 - new Date().getTime();

  }

}
