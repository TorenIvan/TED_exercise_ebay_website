import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {
  }

  signUp(event) {
    event.preventDefault();
    const form = event.target
    const name = form.querySelector('#nuName').value
    const surname = form.querySelector('#nuSurname').value
    const email = form.querySelector('#nuEmail').value
    const phone = form.querySelector('#nuPhone').value
    const country = form.querySelector('#nuCountry').value
    const state = form.querySelector('#nuState').value
    const town = form.querySelector('#nuTown').value
    const address = form.querySelector('#nuAddress').value
    const postcode = form.querySelector('#nuPostcode').value
    const afm = form.querySelector('#nuAFM').value
    const username = form.querySelector('#nuUsername').value
    const password = form.querySelector('#nuPassword').value
    const confPassword = form.querySelector('#nuConfPassword').value

    if(name && surname && email && phone && country && state && town && address && postcode && afm && username && password && confPassword == password) {
      this.tableService.newUser(name, surname, email, phone, country, state, town, address, postcode, afm, username, password).subscribe(data => {
        if(data != null) {
          form.querySelector('#result').style.color = "white"
          form.querySelector('#result').innerHTML = data
        }
      })
    } else if(!name || !surname || !email || !phone || !country || !state || !town || !address || !postcode || !afm || !username || !password){
      form.querySelector('#result').style.color = "yellow"
      form.querySelector('#result').innerHTML = "All fields must be filled in!"
    } else {
      form.querySelector('#result').style.color = "rgb(165, 0, 0)"
      form.querySelector('#result').innerHTML = "Passwords don't match!"
    }    
  }

}
