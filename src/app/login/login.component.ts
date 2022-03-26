import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;
  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService,
    private app: AppService
  ) { }

  ngOnInit() {
  }

  login() {
    const vm = this;
    vm.ds.postDataNoToken('/auth/login', {
      userId: vm.username,
      password: vm.password
    }).subscribe((response) => {
      if (response.error) {
        vm.toastr.error('Invalid credentials.');
      } else {
        console.log(response.data);
        vm.app.User = response.data;
        vm.router.navigate(['/home/radd']);
      }
    });
  }
}
