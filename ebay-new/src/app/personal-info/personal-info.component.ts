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
    console.log(this.idUser);

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
    this.r.navigateByUrl('/refresh/+' + this.idUser + '/+' + 60);
  }

}
