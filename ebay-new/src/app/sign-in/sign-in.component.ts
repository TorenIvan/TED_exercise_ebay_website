import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private tableService: TableServiceService, private rooter: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  signIn(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.querySelector('#uUser').value;
    const password = form.querySelector('#uPass').value;

    if(username.trim() && password.trim()) {
      
      this.tableService.checkUser(username, password).subscribe(data => {
        if(data != null) {
          console.log(data);
          if(data == "0") {
            this.rooter.navigateByUrl('/index');
          } else if(data == 1) {
            this.rooter.navigateByUrl('/indexadmin');
          } else if(data>1) {
            this.rooter.navigateByUrl('/indexuser/+' + data);
          } else {
            form.querySelector('#result').style.color = "rgb(165, 0, 0)"
            form.querySelector('#result').innerHTML = "Username doesn't match with password!"
          }
        } else {
          form.querySelector('#result').style.color = "rgb(165, 0, 0)"
          form.querySelector('#result').innerHTML = "Username doesn't match with password!"
        }
      })
    } else {
      form.querySelector('#result').style.color = "yellow"
      form.querySelector('#result').innerHTML = "Empty fields."
    }
  }

}
