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


  id: number;

  constructor(private tableService: TableServiceService) { }

  ngOnInit() {
    this.id = 2;

    this.tableService.getUserInfo(this.id).subscribe((data: User[]) => {
        this.user = data;
        console.log(data);
    });

  }

  saveProfileChanges(event) {
    event.preventDefault();
  }

}
