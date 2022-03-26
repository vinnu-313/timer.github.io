import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {
  entry: any;
  imageData = '';
  photo;
  constructor(
    private ds: DataService,
    private appService: AppService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const vm = this;
    vm.entry = {};
  }

  clearFields() {
    const vm = this;
    vm.entry = {};
    vm.imageData = '';
  }
  add() {
    const vm = this;
    // console.log(vm.entry && vm.entry['photo']);
    // if (vm.entry && !!vm.entry['photo']) {
      vm.ds.postData('/partics/add', vm.entry).subscribe((response) => {
        if (response.error) {
          vm.toastr.error('Failed to save. Try again !!');
        } else {
          vm.toastr.success('Added');
          vm.clearFields();
        }
      });
    // } else {
    //   vm.toastr.error('Image is not uploaded.');
    // }
  }

  captureImage(fileInput: any) {
    const vm = this;

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        vm.mapImage(e.target.result, fileInput.target.files[0]);
        fileInput.target.value = '';
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    console.log('Here');
  }

  mapImage(image, file) {
    const vm = this;
    const randomNo = Math.random();
    const fd = new FormData();
    fd.append('file', file, file.name);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', vm.appService.Url + '/api/docs/upload', true);
    xhr.setRequestHeader('x-access-token', vm.appService.User.token);
    xhr.upload.addEventListener('progress', uploadProgress, false);
    xhr.addEventListener('load', uploadComplete, false);
    xhr.send(fd);
    const fileObj = {};
    fileObj['file'] = image;
    fileObj['id'] = randomNo;
    fileObj['progress'] = 1;
    function uploadProgress(evt) {
      fileObj['progress'] = Math.round(evt.loaded * 100 / evt.total);
    }
    function uploadComplete(evt) {
      const responseStatus = evt.target.responseText;
      const response = JSON.parse(responseStatus);
      console.log(response.data);
      vm.imageData = image;
      vm.entry['photo'] = response.data;
    }
  }
}
