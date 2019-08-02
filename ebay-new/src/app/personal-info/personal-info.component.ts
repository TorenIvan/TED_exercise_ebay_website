import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { User } from '../user';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  user: User;

  id: number;

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {

    this.user = {
      "id": 2,
      "username": "diva",
      "name": "I am",
      "surname": "a user",
      "phone_number": "6989xxxxxx",
      "email": "user@gmail.com",
      "country": "Greece",
      "state": "Attiki",
      "town": "Athens",
      "address": "Avidou",
      "postcode": "15772",
      "afm": 521364563,
      "rating_bidder": "2",
      "rating_seller": "3"
    };
  }

  saveProfileChanges(event) {
    event.preventDefault();
  }

}
