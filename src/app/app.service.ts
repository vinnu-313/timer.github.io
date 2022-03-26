import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
  private isSpinner: Subject<boolean> = new Subject<boolean>();
  isSpinnerUpdated$ = this.isSpinner.asObservable();
  baseUrl = 'http://localhost:3000';
  user: any;
  private userUpdatedFlag: Subject<boolean> = new Subject<boolean>();
  isUserUpdated$ = this.userUpdatedFlag.asObservable();


  set spinnerData(value: boolean) {
    this.isSpinner.next(value);
  }

  get User(): any {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user;
  }

  set User(value: any) {
    this.user = value;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.userUpdatedFlag.next(true);
  }

  get Url() {
    return this.baseUrl;
  }
}
