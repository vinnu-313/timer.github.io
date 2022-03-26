import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {
  entry: any;
  dis = false;
  bib: number;
  partic: any;

  constructor(private ds: DataService,
    private toastr: ToastrService) { }

  ngOnInit() {
    const vm = this;
    vm.entry = {};
  }

  fetch() {
    const vm = this;
    if (vm.bib) {
      vm.ds.getData('/partics/find/' + vm.bib).subscribe((response) => {
        if (response) {
          vm.partic = response;
        } else {
          vm.toastr.error('Please enter valid bib number.');
          vm.clear();
        }
      });
    } else {
      vm.clear();
      vm.toastr.error('Please enter valid bib number.');
    }
  }

  save(x) {
    const vm = this;
    if (x) {
      vm.dis = true;
      vm.partic.entry = vm.entry;
      if (vm.entry) {
        vm.ds.postData('/result/add', vm.partic).subscribe((response) => {
          console.log(response);
          vm.toastr.success('Result added.');
          vm.clear();
        });
      }
    } else {
      vm.toastr.error('Please fill values for all fields.');
    }
  }

  clear() {
    const vm = this;
    vm.entry = {};
    vm.dis = false;
    vm.bib = undefined;
    vm.partic = null;
  }

}
