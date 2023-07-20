import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsIndentityService {
  private isAuthorized: Subject<boolean> = new Subject<boolean>();
  public isAuthorized$: Observable<boolean> = this.isAuthorized.asObservable();

  constructor() {
    this.isAuthorized.next(this.checkAuthorize());
  }

  public checkAuthorize(): boolean {
    var check = (sessionStorage.getItem('access_token') != null
      && sessionStorage.getItem('email') != null
      && sessionStorage.getItem('login') != null) ? true : false;
    console.log(check);
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
}
