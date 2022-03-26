import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  downloadUrl: string;
  constructor(private ds: DataService,
    private app: AppService) {

  }
  ngOnInit() {
    const vm = this;
    vm.downloadUrl = vm.app.baseUrl + '/api/result/download?token=' + vm.app.User.token; 
  }
}
