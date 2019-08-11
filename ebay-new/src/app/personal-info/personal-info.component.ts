import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../table-service.service';
import { User } from '../user';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  user: User[];


  idUser: number;

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {
    this.idUser = 2;

    this.tableService.getUserInfo(this.idUser).subscribe((data: User[]) => {
        this.user = data;
        console.log(data);
    });

  }

  saveProfileChanges(event) {
    event.preventDefault();
  }

}
