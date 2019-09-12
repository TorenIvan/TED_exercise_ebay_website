import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor(private tableService: TableServiceService, private rooter: Router) { }

  ngOnInit() {
  }

  changePassword(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('#uEmail').value;
    const nPass = form.querySelector('#nPass').value;
    const reNPass = form.querySelector('#nPassCheck').value;

    if(nPass.trim() === reNPass.trim()) {
      this.tableService.setNewPass(email, nPass).subscribe(data => {
        if(data == "1") {
          this.rooter.navigateByUrl('/signin')
        } else {
          form.querySelector('#result').style.color = "yellow"
          form.querySelector('#result').innerHTML = "Something went wrong. Please try again later."
        }
      })
    } else {
      form.querySelector('#result').style.color = "rgb(165, 0, 0)"
      form.querySelector('#result').innerHTML = "Passwords do not match, please check them again."
    }
  }

}
