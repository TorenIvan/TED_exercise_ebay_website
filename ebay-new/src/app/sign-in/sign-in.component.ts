import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private tableService: TableServiceService, private rooter: Router) { }

  ngOnInit() {
  }

  signIn(event) {
    event.preventDefault()
    const form = event.target
    const username = form.querySelector('#uUser').value
    const password = form.querySelector('#uPass').value

    this.tableService.checkUser(username, password).subscribe(data => {
      if(data != null) {
        console.log(data)
        if(data == "0") {
          this.rooter.navigateByUrl('/index')
        }
      } else {
        window.alert(data)
      }
    })
  }

}
