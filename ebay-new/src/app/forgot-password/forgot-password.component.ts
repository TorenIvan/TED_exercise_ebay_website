import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {
  }

  sendEmail(event) {
    event.preventDefault()
    const form = event.target
    const email = form.querySelector('#uEmail').value

    if(email) {
      this.tableService.sendEmail(email).subscribe(data => {
        if(data != null) {
          // console.log(data)
          form.querySelector('#result').style.color = "white"
          form.querySelector('#result').innerHTML = data
        } else {
          form.querySelector('#result').style.color = "rgb(165, 0, 0)"
          form.querySelector('#result').innerHTML = "There was some error. Please try again later"
        }
      })
    } else {
      form.querySelector('#result').style.color = "yellow"
      form.querySelector('#result').innerHTML = "Please type your email first"
    }
  }

}
