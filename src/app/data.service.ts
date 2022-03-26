import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, retry, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class DataService {
  constructor(private http: HttpClient,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute) { }

  getData(path: string): Observable<any> {
    const vm = this;
    // setTimeout(function () { vm.appService.spinnerData = true; }, 0);
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.appService.User.token
      })
    };
    return this.http.get(this.appService.Url + '/api' + path, httpOptions);
    // .map((res: Response) => {
    //   return vm.extractData(res, vm);
    // })
    // .catch((error: Response) => {
    //   return vm.handleError(error, vm);
    // });
  }

  getExcel(path: string) {
    return this.http.get(this.appService.Url + '/api' + path + '?token=' + this.appService.User.token, {
      responseType: 'text'
    });
  }

  getDataBg(path: string): Observable<any> {
    const vm = this;
    const headers = new HttpHeaders();
    headers.append('x-access-token', this.appService.User.token);
    return this.http.get(this.appService.Url + '/api' + path, { headers: headers });
    // .map((res: Response) => {
    //   return vm.extractData(res, vm);
    // })
    // .catch((error: Response) => {
    //   return vm.handleError(error, vm);
    // });
  }

  getPdf(path: string): Observable<any> {
    const vm = this;
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.appService.User.token
      })
    };
    return this.http.get(this.appService.Url + '/api' + path, httpOptions)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => {
        return error;
      });
  }

  getDataNoToken(path: string): Observable<any> {
    const vm = this;
    setTimeout(function () { vm.appService.spinnerData = true; }, 0);
    return this.http.get(this.appService.Url + path)
    // .map((res: Response) => {
    //   return vm.extractData(res, vm);
    // })
    // .catch((error: Response) => {
    //   return vm.handleError(error, vm);
    // });
  }

  postData(path: string, data: any): Observable<any> {
    const vm = this;
    setTimeout(function () { vm.appService.spinnerData = true; }, 0);
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.appService.User.token
      })
    };
    return this.http.post(this.appService.Url + '/api' + path, data, httpOptions);
    // .map((res: Response) => {
    //   return vm.extractData(res, vm);
    // })
    // .catch((error: Response) => {
    //   return vm.handleError(error, vm);
    // });
  }

  postDataNoToken(path: string, data: any): Observable<any> {
    const vm = this;
    setTimeout(function () { vm.appService.spinnerData = true; }, 0);
    return this.http.post(this.appService.Url + path, data)
    // .map((res: Response) => {
    //   return vm.extractData(res, vm);
    // })
    // .catch((error: Response) => {
    //   return vm.handleError(error, vm);
    // });
  }

  getDataNoApi(path: string): Observable<any> {
    const vm = this;
    setTimeout(function () { vm.appService.spinnerData = true; }, 0);
    const headers = new HttpHeaders();
    headers.append('x-access-token', this.appService.User.token);
    return this.http.get(this.appService.Url + '/api' + path, { headers: headers })
    // .map((res: Response) => {
    //   return vm.extractData(res, vm);
    // })
    // .catch((error: Response) => {
    //   return vm.handleError(error, vm);
    // });
  }

  // getExcel(reqData, file) {
  //   const type = 'application/vnd.ms-excel';
  //   const filename = file + '.xls';
  //   const headers = new HttpHeaders();
  //   headers.append('x-access-token', this.appService.User.token);
  //   headers.append('Accept', type);
  //   const options = new RequestOptions({
  //     responseType: ResponseContentType.Blob,
  //     headers: headers
  //   });

  //   this.http.post(this.appService.Url + '/api/config/export', reqData, options)
  //     .catch(errorResponse => Observable.throw(errorResponse.json()))
  //     .map((response) => {
  //       if (response instanceof Response) {
  //         return response.blob();
  //       }
  //       return response;
  //     })
  //     .subscribe(data => saveAs(data, filename),
  //       error => console.log(error));
  // }

  private extractResponse(res: Response, vm) {
    const body = res.json();
    setTimeout(function () { vm.appService.spinnerData = false; }, 0);
    if (body.error) {
      throw (res);
    } else {
      return body;
    }
  }

  private extractData(res: Response, vm) {
    const body = res.json();
    setTimeout(function () { vm.appService.spinnerData = false; }, 0);
    return Observable.create(body);
  }

  private handleError(error: Response | any, vm) {
    if (error.status === 401) {
      this.appService.User = null;
      setTimeout(function () { vm.appService.spinnerData = false; }, 0);
      this.router.navigate(['/login']);
    } else if (error.status !== 0) {
      setTimeout(function () { vm.appService.spinnerData = false; }, 0);
      return error;
    }
  }

  randomString(len) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < len; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
