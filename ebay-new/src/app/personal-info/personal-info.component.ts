import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { User } from '../user';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  user: User;

  idUser: number;
  
  newForm = new FormGroup({
    id : new FormControl({hidden: true}),
    username: new FormControl(),
    name: new FormControl(),
    surname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    country: new FormControl(),
    state: new FormControl(),
    town: new FormControl(),
    address: new FormControl(),
    postcode: new FormControl(),
    afm: new FormControl(),
    ratingB: new FormControl({disabled: true}),
    ratingS: new FormControl({disabled: true})
  });

  constructor(private tableService: TableServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private r: Router) {
    this.newForm = this.formBuilder.group({
      id : {value: '', hidden: true},
      username: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      town: '',
      address: '',
      postcode: '',
      afm: '',
      ratingB: {value: '', disabled: true},
      ratingS: {value: '', disabled: true}
    });
  }

  ngOnInit() {
    this.idUser = parseInt(this.route.snapshot.paramMap.get("id"));
    // console.log(this.idUser);

    this.tableService.getUserInfo(this.idUser).subscribe((data: User) => {
      // console.log(data);
      this.user = data;

      this.newForm.patchValue({
        id : this.user[0].id,
        username: this.user[0].username,
        name: this.user[0].name,
        surname: this.user[0].surname,
        email: this.user[0].email,
        phone: this.user[0].phone_number,
        country: this.user[0].country,
        state: this.user[0].state,
        town: this.user[0].town,
        address: this.user[0].address,
        postcode: this.user[0].postcode,
        afm: this.user[0].afm,
        ratingB: this.user[0].rating_bidder,
        ratingS: this.user[0].rating_seller
      });

    });
  }

  saveProfileChanges(event) {
    event.preventDefault();
    const id = this.newForm.get('id').value;
    const username = this.newForm.get('username').value;
    const name = this.newForm.get('name').value;
    const surname = this.newForm.get('surname').value;
    const email = this.newForm.get('email').value;
    const phone = this.newForm.get('phone').value;
    const country = this.newForm.get('country').value;
    const state = this.newForm.get('state').value;
    const town = this.newForm.get('town').value;
    const address = this.newForm.get('address').value;
    const postcode = this.newForm.get('postcode').value;
    const afm = this.newForm.get('afm').value;

    if(username != null && name != null && surname != null && email != null && phone != null && country != null && state != null && town != null && address != null && postcode != null && afm != null) {

      this.tableService.saveProfile(id, username, name, surname, email, phone, country, state, town, address, postcode, afm).subscribe(data => {
        if(data == "1") {
          this.r.navigateByUrl('/refresh/+' + this.idUser + '/+' + 60);
        } else {
          event.target.querySelector('#result').style.color = "yellow"
          event.target.querySelector('#result').innerHTML = "Something went wrong. Please try again later."
        }
      })    
    } else {
      event.target.querySelector('#result').style.color = "rgb(165, 0, 0)"
      event.target.querySelector('#result').innerHTML = "All input fields must be filled."
    }
  }

}
